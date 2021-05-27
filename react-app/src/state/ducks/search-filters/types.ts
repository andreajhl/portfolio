const MODEL = "search-filters/";

export type SearchFiltersType = {
  limit?: number;
  offset?: number;
  orderBy?: string;
  country_id?: string;
  category_id?: string;
  min_price?: number;
  max_price?: number;
  max_delivery_time?: number;
  hashtags?: string;
};

export const UPDATE_FILTERS = MODEL + "UPDATE_FILTERS";

export const RESET_FILTERS = MODEL + "RESET_FILTERS";
