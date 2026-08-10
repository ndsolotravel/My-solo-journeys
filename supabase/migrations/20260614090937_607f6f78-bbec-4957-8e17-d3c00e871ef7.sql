
INSERT INTO public.destinations (title, slug, country, region, description, featured_image) VALUES
('Nanga Parbat Base Camp', 'nanga-parbat-base-camp', 'Pakistan', 'Gilgit-Baltistan', 'Trek to the foot of the Killer Mountain through fairy meadows and glacial moraines.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80'),
('Hunza Valley', 'hunza-valley', 'Pakistan', 'Gilgit-Baltistan', 'Apricot blossoms, ancient forts and the friendliest people on earth.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80'),
('Skardu & Deosai', 'skardu-deosai', 'Pakistan', 'Gilgit-Baltistan', 'High-altitude lakes and the second-highest plateau on the planet.', 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80'),
('Karakoram Highway', 'karakoram-highway', 'Pakistan', 'KKH', 'The eighth wonder of the world by motorcycle, from Islamabad to Khunjerab.', 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80');

INSERT INTO public.posts (title, slug, excerpt, content, cover_image, category, tags, published, featured, reading_minutes, published_at) VALUES
(
  'Solo to Nanga Parbat: Three Weeks at the Killer Mountain',
  'solo-to-nanga-parbat',
  'A solo trek to Fairy Meadows and beyond — what the ninth-tallest mountain in the world teaches you when no one else is listening.',
  E'## The road in\n\nThe jeep track from Raikot Bridge climbs 2,000 metres in two hours. I had a single duffel, a 40L pack, and no plan beyond reaching Fairy Meadows before nightfall.\n\n## Fairy Meadows\n\nDawn here is unreasonable. The Rupal face of Nanga Parbat rises 4,600 metres above the meadow — the largest mountain wall on earth.\n\n## What I learned\n\nSolo trekking in the Karakoram is less about endurance and more about patience. The mountain decides when you move.',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
  'Nanga Parbat',
  ARRAY['nanga parbat','trekking','solo travel','pakistan'],
  true, true, 9, now() - interval '2 days'
),
(
  'Motorcycle Diaries: 4,200 km Across the Karakoram',
  'motorcycle-karakoram',
  'Three weeks, one 250cc bike, and the highest paved international border on earth.',
  E'## Why ride alone\n\nA motorcycle is the slowest way to disappear and the fastest way to feel a country.\n\n## Khunjerab Pass\n\nAt 4,693m the engine wheezes and so do you. The China border closes at 4 pm sharp.\n\n## Gear that survived\n\nA dual-sport helmet, mesh jacket, and an absurd number of zip-ties.',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&q=80',
  'Motorcycle Adventure Travel',
  ARRAY['motorcycle','karakoram','adventure'],
  true, true, 12, now() - interval '5 days'
),
(
  'Trekking K2 Base Camp: The Concordia Diaries',
  'k2-base-camp-concordia',
  'Twelve days, four 7,000m peaks visible from a single campsite. Concordia is the throne room of the mountain gods.',
  E'## Askole to Paiyu\n\nThe trail starts hot and dusty. The Braldu river is grey with glacial silt.\n\n## Baltoro Glacier\n\nYou walk on the spine of a glacier for a week. The ice groans at night.\n\n## Concordia\n\nFour 7,000m peaks and one 8,000m peak ring the camp. K2 is unmistakable.',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80',
  'Trekking',
  ARRAY['k2','trekking','karakoram'],
  true, false, 11, now() - interval '8 days'
),
(
  'Pakistan Tourism: An Honest Guide for Solo Travellers',
  'pakistan-tourism-solo-guide',
  'Visas, NOCs, transport, safety, and the questions everyone asks before booking a flight.',
  E'## Visa\n\nThe e-visa is straightforward for most nationalities. Allow 7-10 working days.\n\n## Solo as a woman\n\nIt is more welcoming than the headlines suggest. Dress modestly, learn five Urdu phrases.\n\n## Money\n\nATMs work in cities. Carry cash north of Gilgit.',
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80',
  'Pakistan Tourism',
  ARRAY['pakistan','solo travel','guide'],
  true, false, 8, now() - interval '12 days'
),
(
  'Photographing the High Himalaya: Light, Cold, and Patience',
  'photographing-high-himalaya',
  'Notes from a thousand sunrises above 4,000 metres.',
  E'## Gear\n\nOne body, two primes, three batteries. Keep the spares against your skin at night.\n\n## Light\n\nAlpenglow lasts seven minutes. Be set up forty minutes before.\n\n## The shot you came for\n\nUsually shows up on the day you almost stayed in the tent.',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80',
  'Photography',
  ARRAY['photography','mountains','gear'],
  true, false, 7, now() - interval '20 days'
),
(
  'Budget Travel in the Karakoram: $20 a Day',
  'budget-karakoram-20-a-day',
  'Shared jeeps, guesthouses, and the secret economy of green tea.',
  E'## Sleep\n\nGuesthouses range from 1500 to 3500 PKR. The cheapest beds are in Karimabad.\n\n## Eat\n\nDal, chapati, and apricot soup. Repeat.\n\n## Move\n\nShared jeeps are an order of magnitude cheaper than private hires and twice as memorable.',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1600&q=80',
  'Budget Travel',
  ARRAY['budget','pakistan','guide'],
  true, false, 6, now() - interval '30 days'
);

INSERT INTO public.gallery (image_url, caption, category, width, height) VALUES
('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80','Nanga Parbat at dawn','Mountains',1600,1067),
('https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&q=80','Deosai plains','Mountains',1600,1067),
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80','Hunza in autumn','Pakistan',1600,1067),
('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1600&q=80','Baltoro glacier','Trekking',1600,1067),
('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&q=80','Bike on the KKH','Motorcycle',1600,1067),
('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80','Mountain road','Mountains',1600,1067),
('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1600&q=80','River valley','Nature',1600,1067),
('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80','Alpine evening','Mountains',1600,1067),
('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80','Markets of Lahore','Pakistan',1600,1067),
('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80','Camp by the lake','Trekking',1600,1067),
('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1600&q=80','Glacier crossing','Trekking',1600,1067),
('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80','Forest road','Nature',1600,1067);
