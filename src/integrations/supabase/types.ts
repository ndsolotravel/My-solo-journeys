export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      comments: {
        Row: {
          comment: string
          created_at: string
          guest_email: string | null
          guest_name: string | null
          id: string
          post_id: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string
          guest_email?: string | null
          guest_name?: string | null
          id?: string
          post_id: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string
          guest_email?: string | null
          guest_name?: string | null
          id?: string
          post_id?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_hash: string | null
          message: string
          name: string
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          message: string
          name: string
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          message?: string
          name?: string
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      destinations: {
        Row: {
          country: string
          created_at: string
          description: string | null
          featured_image: string | null
          id: string
          published: boolean
          region: string | null
          slug: string
          title: string
        }
        Insert: {
          country: string
          created_at?: string
          description?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          region?: string | null
          slug: string
          title: string
        }
        Update: {
          country?: string
          created_at?: string
          description?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          region?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          caption: string | null
          category: string | null
          created_at: string
          height: number | null
          id: string
          image_url: string
          width: number | null
        }
        Insert: {
          caption?: string | null
          category?: string | null
          created_at?: string
          height?: number | null
          id?: string
          image_url: string
          width?: number | null
        }
        Update: {
          caption?: string | null
          category?: string | null
          created_at?: string
          height?: number | null
          id?: string
          image_url?: string
          width?: number | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string | null
          category: string
          content: string
          cover_image: string | null
          created_at: string
          destination_id: string | null
          excerpt: string | null
          featured: boolean
          id: string
          og_image_url: string | null
          published: boolean
          published_at: string | null
          reading_minutes: number
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          tags: string[]
          title: string
          travel_date: string | null
          updated_at: string
          views: number
        }
        Insert: {
          author_id?: string | null
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          destination_id?: string | null
          excerpt?: string | null
          featured?: boolean
          id?: string
          og_image_url?: string | null
          published?: boolean
          published_at?: string | null
          reading_minutes?: number
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tags?: string[]
          title: string
          travel_date?: string | null
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          destination_id?: string | null
          excerpt?: string | null
          featured?: boolean
          id?: string
          og_image_url?: string | null
          published?: boolean
          published_at?: string | null
          reading_minutes?: number
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tags?: string[]
          title?: string
          travel_date?: string | null
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          }
        ]
      }
      post_gallery: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          image_url: string
          post_id: string
          sort_order: number
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url: string
          post_id: string
          sort_order?: number
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          image_url?: string
          post_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_gallery_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          id: string
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: number
          session_id: string
          path: string
          title: string | null
          referrer: string | null
          created_at: string
        }
        Insert: {
          id?: number
          session_id: string
          path?: string
          title?: string | null
          referrer?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          session_id?: string
          path?: string
          title?: string | null
          referrer?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_views_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["session_id"]
          }
        ]
      }
      visitor_sessions: {
        Row: {
          session_id: string
          last_active_at: string
          created_at: string
          device_type: string | null
          browser: string | null
          os: string | null
          country: string | null
          referrer_source: string | null
          entry_page: string | null
        }
        Insert: {
          session_id: string
          last_active_at?: string
          created_at?: string
          device_type?: string | null
          browser?: string | null
          os?: string | null
          country?: string | null
          referrer_source?: string | null
          entry_page?: string | null
        }
        Update: {
          session_id?: string
          last_active_at?: string
          created_at?: string
          device_type?: string | null
          browser?: string | null
          os?: string | null
          country?: string | null
          referrer_source?: string | null
          entry_page?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      publish_scheduled_posts: { Args: never; Returns: number }
      cleanup_stale_visitor_sessions: { Args: never; Returns: void }
    }
    Enums: {
      app_role: "admin" | "editor" | "reader"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "reader"],
    },
  },
} as const
