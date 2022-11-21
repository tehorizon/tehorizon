export interface outletSearchApiParams {
  location_id: number;
  category?: string;
  query: string;
  query_type: string;
  offset: number;
  language: string;
  show_new_offers?: boolean;
  sub_category_filter?: string;
  cuisine_filter?: Array<string>;
  filters_selected_for_yes?: Array<string>;
  filters_selected_for_no?: Array<string>;
  lat: number;
  lng: number;
}
