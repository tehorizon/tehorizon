import {City, Destination} from './screens';

export type location = {
  all_destinations: Array<{
    title: string;
    destinations?: Array<Destination>;
    data?: Array<Destination>;
  }>;
  is_show_all_cities: boolean;
  is_show_search: boolean;
  top_destinations: Array<City>;
};
