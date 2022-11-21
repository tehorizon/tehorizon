export interface user {
  __company: string;
  __platform: string;
  __language: string;
  __app_version: string;
  __user_id: number;
  __session_id: number;
  __session_token: string;
  is_demographics_updated: 0 | 1;
  demographics_url: string;
  registration_with_facebook_required: boolean;
  firstname: string;
  lastname: string;
  email: string;
  social_account_message: string;
  is_destination_selection_allowed: 0 | 1;
}
