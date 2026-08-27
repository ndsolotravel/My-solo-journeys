export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      "Blog-posts": {
        Row: {};
        Insert: {};
        Update: {};
        Relationships: [];
      };
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          display_order: number;
          id: string;
          image_url: string | null;
          name: string;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          display_order?: number;
          id?: string;
          image_url?: string | null;
          name: string;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          display_order?: number;
          id?: string;
          image_url?: string | null;
          name?: string;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          comment: string;
          created_at: string;
          guest_email: string | null;
          guest_name: string | null;
          id: string;
          post_id: string;
          rating: number | null;
          user_id: string | null;
        };
        Insert: {
          comment: string;
          created_at?: string;
          guest_email?: string | null;
          guest_name?: string | null;
          id?: string;
          post_id: string;
          rating?: number | null;
          user_id?: string | null;
        };
        Update: {
          comment?: string;
          created_at?: string;
          guest_email?: string | null;
          guest_name?: string | null;
          id?: string;
          post_id?: string;
          rating?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      "Contact form": {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string;
          ip_hash: string | null;
          message: string | null;
          name: string | null;
          subject: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          ip_hash?: string | null;
          message?: string | null;
          name?: string | null;
          subject?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          ip_hash?: string | null;
          message?: string | null;
          name?: string | null;
          subject?: string | null;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          ip_hash: string | null;
          message: string;
          name: string;
          status: string | null;
          subject: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          ip_hash?: string | null;
          message: string;
          name: string;
          status?: string | null;
          subject?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          ip_hash?: string | null;
          message?: string;
          name?: string;
          status?: string | null;
          subject?: string | null;
        };
        Relationships: [];
      };
      conversation_members: {
        Row: {
          conversation_id: string;
          created_at: string;
          role: string;
          user_id: string;
        };
        Insert: {
          conversation_id: string;
          created_at?: string;
          role?: string;
          user_id: string;
        };
        Update: {
          conversation_id?: string;
          created_at?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversation_members_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
        ];
      };
      conversation_messages: {
        Row: {
          body: string;
          conversation_id: string;
          created_at: string;
          id: string;
          sender_id: string;
        };
        Insert: {
          body: string;
          conversation_id: string;
          created_at?: string;
          id?: string;
          sender_id: string;
        };
        Update: {
          body?: string;
          conversation_id?: string;
          created_at?: string;
          id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: false;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
        ];
      };
      conversation_summaries: {
        Row: {
          conversation_id: string;
          last_message_id: string | null;
          summary: string;
          summary_updated_at: string;
        };
        Insert: {
          conversation_id: string;
          last_message_id?: string | null;
          summary?: string;
          summary_updated_at?: string;
        };
        Update: {
          conversation_id?: string;
          last_message_id?: string | null;
          summary?: string;
          summary_updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "conversation_summaries_conversation_id_fkey";
            columns: ["conversation_id"];
            isOneToOne: true;
            referencedRelation: "conversations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "conversation_summaries_last_message_id_fkey";
            columns: ["last_message_id"];
            isOneToOne: false;
            referencedRelation: "conversation_messages";
            referencedColumns: ["id"];
          },
        ];
      };
      conversations: {
        Row: {
          created_at: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      destinations: {
        Row: {
          country: string;
          created_at: string;
          description: string | null;
          featured_image: string | null;
          id: string;
          published: boolean;
          region: string | null;
          slug: string;
          title: string;
        };
        Insert: {
          country: string;
          created_at?: string;
          description?: string | null;
          featured_image?: string | null;
          id?: string;
          published?: boolean;
          region?: string | null;
          slug: string;
          title: string;
        };
        Update: {
          country?: string;
          created_at?: string;
          description?: string | null;
          featured_image?: string | null;
          id?: string;
          published?: boolean;
          region?: string | null;
          slug?: string;
          title?: string;
        };
        Relationships: [];
      };
      gallery: {
        Row: {
          caption: string | null;
          category: string | null;
          created_at: string;
          height: number | null;
          id: string;
          image_url: string;
          width: number | null;
        };
        Insert: {
          caption?: string | null;
          category?: string | null;
          created_at?: string;
          height?: number | null;
          id?: string;
          image_url: string;
          width?: number | null;
        };
        Update: {
          caption?: string | null;
          category?: string | null;
          created_at?: string;
          height?: number | null;
          id?: string;
          image_url?: string;
          width?: number | null;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          is_read: boolean;
          message: string;
          name: string;
          status: string;
          subject: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          is_read?: boolean;
          message: string;
          name: string;
          status?: string;
          subject?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          is_read?: boolean;
          message?: string;
          name?: string;
          status?: string;
          subject?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      news: {
        Row: {
          content: string;
          created_at: string;
          display_order: number;
          expires_at: string | null;
          id: string;
          image_url: string | null;
          is_active: boolean;
          is_breaking: boolean;
          published_at: string;
          slug: string;
          status: string;
          summary: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          display_order?: number;
          expires_at?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean;
          is_breaking?: boolean;
          published_at?: string;
          slug: string;
          status?: string;
          summary?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          display_order?: number;
          expires_at?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean;
          is_breaking?: boolean;
          published_at?: string;
          slug?: string;
          status?: string;
          summary?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      legal_pages: {
        Row: {
          content: string;
          created_at: string;
          hero_image: string | null;
          id: string;
          published: boolean;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          hero_image?: string | null;
          id?: string;
          published?: boolean;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          hero_image?: string | null;
          id?: string;
          published?: boolean;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      page_views: {
        Row: {
          created_at: string;
          id: number;
          path: string;
          referrer: string | null;
          session_id: string;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          id?: never;
          path?: string;
          referrer?: string | null;
          session_id: string;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          id?: never;
          path?: string;
          referrer?: string | null;
          session_id?: string;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "page_views_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "visitor_sessions";
            referencedColumns: ["session_id"];
          },
        ];
      };
      post_gallery: {
        Row: {
          alt_text: string | null;
          created_at: string;
          id: string;
          image_url: string;
          post_id: string;
          sort_order: number;
        };
        Insert: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          image_url: string;
          post_id: string;
          sort_order?: number;
        };
        Update: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          image_url?: string;
          post_id?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "post_gallery_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      post_translations: {
        Row: {
          content: string;
          created_at: string;
          excerpt: string | null;
          id: string;
          language_code: string;
          post_id: string;
          seo_description: string | null;
          seo_title: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          language_code: string;
          post_id: string;
          seo_description?: string | null;
          seo_title?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          language_code?: string;
          post_id?: string;
          seo_description?: string | null;
          seo_title?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_translations_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          author_id: string | null;
          author_image_url: string | null;
          author_name: string | null;
          category: string;
          category_id: string | null;
          content: string;
          cover_image: string | null;
          created_at: string;
          destination_id: string | null;
          excerpt: string | null;
          featured: boolean;
          id: string;
          latitude: number | null;
          location_name: string | null;
          longitude: number | null;
          og_image_url: string | null;
          published: boolean;
          published_at: string | null;
          reading_minutes: number;
          scheduled_at: string | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          tags: string[];
          title: string;
          travel_date: string | null;
          updated_at: string;
          views: number;
        };
        Insert: {
          author_id?: string | null;
          author_image_url?: string | null;
          author_name?: string | null;
          category?: string;
          category_id?: string | null;
          content?: string;
          cover_image?: string | null;
          created_at?: string;
          destination_id?: string | null;
          excerpt?: string | null;
          featured?: boolean;
          id?: string;
          latitude?: number | null;
          location_name?: string | null;
          longitude?: number | null;
          og_image_url?: string | null;
          published?: boolean;
          published_at?: string | null;
          reading_minutes?: number;
          scheduled_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          tags?: string[];
          title: string;
          travel_date?: string | null;
          updated_at?: string;
          views?: number;
        };
        Update: {
          author_id?: string | null;
          author_image_url?: string | null;
          author_name?: string | null;
          category?: string;
          category_id?: string | null;
          content?: string;
          cover_image?: string | null;
          created_at?: string;
          destination_id?: string | null;
          excerpt?: string | null;
          featured?: boolean;
          id?: string;
          latitude?: number | null;
          location_name?: string | null;
          longitude?: number | null;
          og_image_url?: string | null;
          published?: boolean;
          published_at?: string | null;
          reading_minutes?: number;
          scheduled_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          tags?: string[];
          title?: string;
          travel_date?: string | null;
          updated_at?: string;
          views?: number;
        };
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_destination_id_fkey";
            columns: ["destination_id"];
            isOneToOne: false;
            referencedRelation: "destinations";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          id: string;
          updated_at: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          id: string;
          updated_at?: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          id?: string;
          updated_at?: string;
          username?: string | null;
        };
        Relationships: [];
      };
      public_popup_messages: {
        Row: {
          created_at: string;
          enabled: boolean;
          end_at: string;
          id: string;
          is_enabled: boolean;
          message: string;
          start_at: string;
          title: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string;
          enabled?: boolean;
          end_at?: string;
          id?: string;
          is_enabled?: boolean;
          message?: string;
          start_at?: string;
          title?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string;
          enabled?: boolean;
          end_at?: string;
          id?: string;
          is_enabled?: boolean;
          message?: string;
          start_at?: string;
          title?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          created_at: string;
          description: string | null;
          key: string;
          updated_at: string;
          value: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          key: string;
          updated_at?: string;
          value: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          key?: string;
          updated_at?: string;
          value?: string;
        };
        Relationships: [];
      };
      subscribers: {
        Row: {
          email: string;
          id: string;
          status: string;
          subscribed_at: string;
        };
        Insert: {
          email: string;
          id?: string;
          status?: string;
          subscribed_at?: string;
        };
        Update: {
          email?: string;
          id?: string;
          status?: string;
          subscribed_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      visitor_sessions: {
        Row: {
          browser: string | null;
          country: string | null;
          country_code: string | null;
          created_at: string;
          device_type: string | null;
          entry_page: string | null;
          last_active_at: string;
          os: string | null;
          referrer_source: string | null;
          session_id: string;
          subscriber_email: string | null;
        };
        Insert: {
          browser?: string | null;
          country?: string | null;
          country_code?: string | null;
          created_at?: string;
          device_type?: string | null;
          entry_page?: string | null;
          last_active_at?: string;
          os?: string | null;
          referrer_source?: string | null;
          session_id: string;
          subscriber_email?: string | null;
        };
        Update: {
          browser?: string | null;
          country?: string | null;
          country_code?: string | null;
          created_at?: string;
          device_type?: string | null;
          entry_page?: string | null;
          last_active_at?: string;
          os?: string | null;
          referrer_source?: string | null;
          session_id?: string;
          subscriber_email?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      admin_update_post_destination: {
        Args: { p_destination_id: string; p_post_id: string };
        Returns: Json;
      };
      admin_update_post_location: {
        Args: {
          p_latitude: number;
          p_location_name: string;
          p_longitude: number;
          p_post_id: string;
        };
        Returns: Json;
      };
      cleanup_stale_visitor_sessions: { Args: never; Returns: undefined };
      get_public_hit_stats: { Args: never; Returns: Json };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      is_admin:
        | { Args: never; Returns: boolean }
        | { Args: { _user_id?: string }; Returns: boolean };
      newsletter_subscribe: { Args: { p_email: string }; Returns: Json };
      send_contact_message: {
        Args: {
          p_email: string;
          p_ip_hash?: string;
          p_message: string;
          p_name: string;
          p_subject: string;
        };
        Returns: Json;
      };
      upsert_visitor_session: {
        Args: {
          p_browser?: string;
          p_country?: string;
          p_country_code?: string;
          p_device_type?: string;
          p_is_new_page_view?: boolean;
          p_os?: string;
          p_path?: string;
          p_referrer?: string;
          p_referrer_source?: string;
          p_session_id: string;
          p_subscriber_email?: string;
          p_title?: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      app_role: "admin" | "editor" | "reader";
      contact_message_status: "new" | "read" | "archived";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["admin", "editor", "reader"],
      contact_message_status: ["new", "read", "archived"],
    },
  },
} as const;
