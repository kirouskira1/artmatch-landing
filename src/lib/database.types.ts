export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: number
          edital_id: number
          artist_id: string
          status: string
          submission_data: Json | null
          documents: Json | null
          feedback: string | null
          score: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          edital_id: number
          artist_id: string
          status?: string
          submission_data?: Json | null
          documents?: Json | null
          feedback?: string | null
          score?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          edital_id?: number
          artist_id?: string
          status?: string
          submission_data?: Json | null
          documents?: Json | null
          feedback?: string | null
          score?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_edital_id_fkey"
            columns: ["edital_id"]
            referencedRelation: "editals"
            referencedColumns: ["id"]
          }
        ]
      }
      application_documents: {
        Row: {
          id: number
          application_id: number
          name: string
          file_url: string
          file_type: string | null
          file_size: number | null
          uploaded_at: string
        }
        Insert: {
          id?: number
          application_id: number
          name: string
          file_url: string
          file_type?: string | null
          file_size?: number | null
          uploaded_at?: string
        }
        Update: {
          id?: number
          application_id?: number
          name?: string
          file_url?: string
          file_type?: string | null
          file_size?: number | null
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            referencedRelation: "applications"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      editals: {
        Row: {
          id: number
          title: string
          description: string
          organization_id: string
          organization_name: string
          location: string | null
          deadline: string
          event_date: string | null
          event_end_date: string | null
          category_id: number | null
          value: string | null
          slots: number | null
          requirements: string[] | null
          documents: string[] | null
          criteria: Json | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          organization_id: string
          organization_name: string
          location?: string | null
          deadline: string
          event_date?: string | null
          event_end_date?: string | null
          category_id?: number | null
          value?: string | null
          slots?: number | null
          requirements?: string[] | null
          documents?: string[] | null
          criteria?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          organization_id?: string
          organization_name?: string
          location?: string | null
          deadline?: string
          event_date?: string | null
          event_end_date?: string | null
          category_id?: number | null
          value?: string | null
          slots?: number | null
          requirements?: string[] | null
          documents?: string[] | null
          criteria?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "editals_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "editals_organization_id_fkey"
            columns: ["organization_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      edital_stages: {
        Row: {
          id: number
          edital_id: number
          name: string
          description: string | null
          start_date: string | null
          end_date: string | null
          order_number: number
          created_at: string
        }
        Insert: {
          id?: number
          edital_id: number
          name: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          order_number: number
          created_at?: string
        }
        Update: {
          id?: number
          edital_id?: number
          name?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          order_number?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "edital_stages_edital_id_fkey"
            columns: ["edital_id"]
            referencedRelation: "editals"
            referencedColumns: ["id"]
          }
        ]
      }
      favorites: {
        Row: {
          id: number
          user_id: string
          edital_id: number
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          edital_id: number
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          edital_id?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_edital_id_fkey"
            columns: ["edital_id"]
            referencedRelation: "editals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: number
          sender_id: string | null
          recipient_id: string | null
          edital_id: number | null
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: number
          sender_id?: string | null
          recipient_id?: string | null
          edital_id?: number | null
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          sender_id?: string | null
          recipient_id?: string | null
          edital_id?: number | null
          content?: string
          read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_edital_id_fkey"
            columns: ["edital_id"]
            referencedRelation: "editals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: number
          user_id: string
          type: string
          title: string
          description: string
          link: string | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          title: string
          description: string
          link?: string | null
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          title?: string
          description?: string
          link?: string | null
          read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      notification_settings: {
        Row: {
          id: number
          user_id: string
          type: string
          email: boolean
          push: boolean
          site: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          type: string
          email?: boolean
          push?: boolean
          site?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          type?: string
          email?: boolean
          push?: boolean
          site?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_settings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      portfolio_items: {
        Row: {
          id: number
          artist_id: string
          title: string
          description: string | null
          image_url: string | null
          category_id: number | null
          year: number | null
          dimensions: string | null
          materials: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          artist_id: string
          title: string
          description?: string | null
          image_url?: string | null
          category_id?: number | null
          year?: number | null
          dimensions?: string | null
          materials?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          artist_id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          category_id?: number | null
          year?: number | null
          dimensions?: string | null
          materials?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_items_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_items_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          location: string | null
          phone: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_artist_stats: {
        Args: {
          artist_uuid: string
        }
        Returns: {
          total_applications: number
          active_applications: number
          approved_applications: number
          portfolio_items: number
        }[]
      }
      get_matching_editals: {
        Args: {
          artist_uuid: string
        }
        Returns: {
          edital_id: number
          title: string
          organization_name: string
          deadline: string
          category_name: string
          compatibility: number
        }[]
      }
      get_organizer_stats: {
        Args: {
          organizer_uuid: string
        }
        Returns: {
          total_editals: number
          active_editals: number
          total_applications: number
          pending_applications: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
