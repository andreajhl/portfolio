const MODEL = "search-filters/";

export type SearchFiltersType = {
  limit?: number;
  offset?: number;
  orderBy?: string;
  country_id?: string;
  category_id?: string;
  price_gt?: number;
  price_lt?: number;
  max_delivery_time?: number;
  hashtags?: string;
};

export const UPDATE_FILTERS = MODEL + "UPDATE_FILTERS";

export const RESET_FILTERS = MODEL + "RESET_FILTERS";
