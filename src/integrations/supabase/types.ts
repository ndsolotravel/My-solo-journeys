export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_hash?: string | null
          message: string
          name: string
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_hash?: string | null
          message?: string
          name?: string
          status?: string | null
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
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string
          id: number
          path: string
          referrer: string | null
          session_id: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          path: string
          referrer?: string | null
          session_id: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          path?: string
          referrer?: string | null
          session_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_views_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "visitor_sessions"
            referencedColumns: ["session_id"]
          },
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
          },
        ]
      }
      post_translations: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          id: string
          language_code: string
          post_id: string
          seo_description: string | null
          seo_title: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          language_code: string
          post_id: string
          seo_description?: string | null
          seo_title?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          language_code?: string
          post_id?: string
          seo_description?: string | null
          seo_title?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_translations_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          author_name: string | null
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
          author_name?: string | null
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
          author_name?: string | null
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
          },
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
          status: string
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          status?: string
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          status?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string
          description?: string | null
          created_at?: string
          updated_at?: string
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
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitor_sessions: {
        Row: {
          browser: string | null
          country: string | null
          country_code: string | null
          created_at: string
          device_type: string | null
          entry_page: string | null
          last_active_at: string
          os: string | null
          referrer_source: string | null
          session_id: string
          subscriber_email: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string
          device_type?: string | null
          entry_page?: string | null
          last_active_at?: string
          os?: string | null
          referrer_source?: string | null
          session_id: string
          subscriber_email?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          country_code?: string | null
          created_at?: string
          device_type?: string | null
          entry_page?: string | null
          last_active_at?: string
          os?: string | null
          referrer_source?: string | null
          session_id?: string
          subscriber_email?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_stale_visitor_sessions: { Args: never; Returns: undefined }
      get_public_hit_stats: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin:
        | { Args: never; Returns: boolean }
        | { Args: { _user_id?: string }; Returns: boolean }
      newsletter_subscribe: { Args: { p_email: string }; Returns: Json }
      send_contact_message: {
        Args: {
          p_email: string
          p_ip_hash?: string
          p_message: string
          p_name: string
          p_subject: string
        }
        Returns: Json
      }
      upsert_visitor_session: {
        Args: {
          p_browser?: string
          p_country?: string
          p_country_code?: string
          p_device_type?: string
          p_is_new_page_view?: boolean
          p_os?: string
          p_path?: string
          p_referrer?: string
          p_referrer_source?: string
          p_session_id: string
          p_subscriber_email?: string
          p_title?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "reader"
      contact_message_status: "new" | "read" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof Database
}
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "reader"],
      contact_message_status: ["new", "read", "archived"],
    },
  },
} as const
