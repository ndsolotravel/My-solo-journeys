
-- Enums
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'reader');

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- posts
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'Solo Travel',
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  views INTEGER NOT NULL DEFAULT 0,
  reading_minutes INTEGER NOT NULL DEFAULT 5,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX posts_published_idx ON public.posts (published, published_at DESC);
CREATE INDEX posts_category_idx ON public.posts (category);
GRANT SELECT ON public.posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are public" ON public.posts FOR SELECT USING (published = true);
CREATE POLICY "Authors/admins/editors see all" ON public.posts FOR SELECT TO authenticated USING (
  auth.uid() = author_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);
CREATE POLICY "Editors/admins manage posts" ON public.posts FOR ALL TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
) WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);
CREATE TRIGGER trg_posts_updated BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- comments
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX comments_post_idx ON public.comments (post_id, created_at DESC);
GRANT SELECT ON public.comments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.comments TO authenticated;
GRANT ALL ON public.comments TO service_role;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comments are public" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Auth users create comments" ON public.comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own comments" ON public.comments FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- subscribers
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.subscribers TO anon;
GRANT INSERT ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);

-- contact_messages
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT INSERT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- destinations
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  region TEXT,
  description TEXT,
  featured_image TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.destinations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.destinations TO authenticated;
GRANT ALL ON public.destinations TO service_role;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Destinations public" ON public.destinations FOR SELECT USING (published = true);
CREATE POLICY "Editors manage destinations" ON public.destinations FOR ALL TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
) WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);

-- gallery
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
GRANT ALL ON public.gallery TO service_role;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gallery public" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Editors manage gallery" ON public.gallery FOR ALL TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
) WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')
);
