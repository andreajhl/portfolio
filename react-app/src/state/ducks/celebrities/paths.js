export const MODEL = `celebrities`;

export const LIST = `custom-endpoints/${MODEL}/public-list`;
export const SEARCH_LIST = `custom-endpoints/${MODEL}/search-list`;
export const POST = `crud/post/${MODEL}`;
export const UPDATE = `crud/put/${MODEL}/`;
export const GET = `custom-endpoints/${MODEL}:version/public-get/`;
export const REVIEWS = `custom-endpoints/${MODEL}/public-contract-reviews/`;
export const REVIEWS_V2 = `custom-endpoints/${MODEL}/v2/public-contract-reviews/`;
export const PUBLIC_CONTRACTS = `custom-endpoints/${MODEL}/public-contracts/`;
export const PUBLIC_CONTRACTS_V2 = `custom-endpoints/${MODEL}/v2/public-contracts/`;
export const SIMILAR_CELEBRITIES = `custom-endpoints/${MODEL}/similar-celebrities/`;
export const SIMILAR_CELEBRITIES_V2 = `custom-endpoints/${MODEL}/v2/similar-celebrities/`;
export const FLASH_DELIVERY_CELEBRITIES = "flash_delivery_celebrities";
export const CELEBRITY_SUBSCRIPTION_PLANS =
  "/custom-endpoints/celebrity-subscription-plans/:celebrity_username/list";

export const SUGGESTED_PUBLIC_LIST = `custom-endpoints/${MODEL}/suggested-public-list`;
