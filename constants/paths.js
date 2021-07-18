import objectHasProperties from "lib/utils/objectHasProperties";
import { jsonToQueryString } from "react-app/src/state/utils/apiService";

export const ROOT_PATH = "/";
export const HOME_PATH = "/inicio/";
export const LANDING_PATH = "/landing";
export const SEARCH_PATH = "/buscar";
export const CELEBRITY_PROFILE = "/:celebrity_username";
export const CELEBRITY_PROFILE_ERROR = "/:celebrity_username/404-not-found/";
export const CELEBRITY_PROFILE_CONTRACT = "/:celebrity_username/contratar";
export const PAYMENT_METHODS = "/metodos-de-pago/:contract_reference";
export const STRIPE_3D_SECURE_IFRAME =
  "/metodos-de-pago/:contract_reference/stripe-3d-secure/iframe";
export const STRIPE_3D_SECURE_RESPONSE =
  "/metodos-de-pago/:contract_reference/stripe-3d-secure/response";
export const CONTRACT_CREATED = "/contract-created/:contract_reference";
export const CONTRACT_PENDING = "/resumen-de-compra/:contract_reference";
// DOCS
export const TERMS_PATH = "/docs/terminos";
export const POLICIES_PATH = "/docs/politicas";
export const FAQS_PATH = "/docs/faqs";
// AUTH
export const AUTH_FLOW = "/auth/select-flow/";
export const AUTH_SUCCESS = "/authentication/success";
export const SIGN_IN_PATH = "/auth/sign-in/";
export const SIGN_IN_FROM_PATH = "/auth/sign-in/from";
export const SIGN_IN_WITH_SPECIFIC_FORM_PATH = "/auth/sign-in/:form/";
export const SIGN_UP_PATH = "/auth/sign-up";
export const SIGN_UP_WITH_SPECIFIC_FORM_PATH = "/auth/sign-up/:form/";
export const VALIDATE_SECURITY_CODE = "/auth/validate-security-code/:form";
export const RESET_PASSWORD_PATH = "/auth/reset-password";
export const CHANGE_PASSWORD_PATH = "/auth/change-password";
export const CREATE_PASSWORD_PATH = "/auth/create-password";
export const COMPLETE_PROFILE_PATH = "/auth/complete-profile";
// FORMS
export const CELEBRITY_REQUEST = "/forms/aplicar";
// CLIENT
export const CLIENT_FAVORITES = "/my-account/favorites";
export const CLIENT_PROFILE = "/my-account/profile";
export const CLIENT_HIRINGS = "/my-account/hirings";
export const CLIENT_SUBSCRIPTIONS = "/my-account/subscriptions";
export const ACCOUNT_HIRING_PREVIEW = "/my-account/hirings/:contract_reference";
export const CLIENT_HIRING_SHARE_IN_MAIL = `${ACCOUNT_HIRING_PREVIEW}/share-in-mail`;
export const CLIENT_HIRING_SHARE_IN_WHATSAPP = `${ACCOUNT_HIRING_PREVIEW}/share-in-whatsapp`;
export const CLIENT_HIRING_PREVIEW_EDITOR = `${ACCOUNT_HIRING_PREVIEW}/preview-editor`;
export const HIRING_PREVIEW = "/hirings/:contract_reference";
export const HIRING_EDITOR = "/hirings/:contract_reference/editor";
export const HIRING_PREVIEW_WITHOUT_SESSION = "/hirings/:contract_reference";
export const GIFT_PREVIEW = "/gift/:contract_reference";
// TRENDING
export const TRENDING = "/tendencias";
export const BLOG = "/blog";
export const BLOG_ENTRY = `${BLOG}/:id`;
//SUBSCRIPTION
export const CELEBRITY_SUBSCRIBE = "/:celebrity_username/club";
export const SUBSCRIPTION = "/subscription/subscribe/:celebrity_username";
//SUBSCRIPTION
export const SUBSCRIPTION_SUCCESS =
  "/subscription/subscription-success/:celebrity_username";
//SUBSCRIPTION FEED
export const FEED_SUBSCRIPTION = "/subscription/feed";
//SESSION REDIRECT
export const SESSION_REDIRECT = "/session/redirect/";

export const PURCHASE_SUMMARY = "/purchase-summary/:contract_reference";

export const PAYMENT_AUTHORIZATION_INFO =
  "https://pagos.famosos.com/autorizaciondepago";

export const getPurchaseSummaryPath = (contract_reference) =>
  PURCHASE_SUMMARY.replace(":contract_reference", contract_reference);

export const CREATE_CONTRACT_QUERY_PARAM = "createContract";

export const getCelebrityProfilePath = (
  celebrityUsername,
  { focusCreateContractWizard = false } = {}
) => {
  const queryParams = focusCreateContractWizard
    ? `?${CREATE_CONTRACT_QUERY_PARAM}=true`
    : "";
  return (
    CELEBRITY_PROFILE.replace(":celebrity_username", celebrityUsername) +
    queryParams
  );
};

export const getHireCelebrityPath = (celebrityUsername) =>
  CELEBRITY_PROFILE_CONTRACT.replace(":celebrity_username", celebrityUsername);

export const getCelebrityFanClubPath = (celebrityUsername) =>
  CELEBRITY_SUBSCRIBE.replace(":celebrity_username", celebrityUsername);

export const getSearchPath = ({
  pageSize = 40,
  currentPage = 1,
  ...params
}) => {
  return SEARCH_PATH + jsonToQueryString({ pageSize, currentPage, ...params });
};

export const getSearchKeywordPath = (keyword) =>
  getSearchPath({ search: keyword });

export const getSearchCategoryPath = (categoryId) =>
  getSearchPath({ category_id: categoryId });

export const getSearchCountryPath = (countryId) =>
  getSearchPath({ country_id: countryId });

export const getSearchHashtagPath = (hashtag) =>
  getSearchPath({ hashtags: String(hashtag).toLowerCase() });

export const IS_UNAUTHORIZED_QUERY_PARAM = "isUnauthorized";

export function getHiringPreviewPath(
  contractReference,
  { isUnauthorized = false } = {}
) {
  const queryParams = isUnauthorized
    ? `?${IS_UNAUTHORIZED_QUERY_PARAM}=true`
    : "";
  return (
    HIRING_PREVIEW.replace(":contract_reference", contractReference) +
    queryParams
  );
}

export const getClientHiringPreviewPath = (contractReference) =>
  ACCOUNT_HIRING_PREVIEW.replace(":contract_reference", contractReference);

export const getClientHiringPreviewEditorPath = (contractReference) =>
  CLIENT_HIRING_PREVIEW_EDITOR.replace(
    ":contract_reference",
    contractReference
  );

export const getGiftPreviewPath = (contractReference) =>
  GIFT_PREVIEW.replace(":contract_reference", contractReference);

export const getClientHiringShareInMailPath = (contractReference) =>
  CLIENT_HIRING_SHARE_IN_MAIL.replace(":contract_reference", contractReference);

export const getClientHiringShareInWhatsappPath = (contractReference) =>
  CLIENT_HIRING_SHARE_IN_WHATSAPP.replace(
    ":contract_reference",
    contractReference
  );

export const getPaymentMethodsPath = (contractReference) =>
  PAYMENT_METHODS.replace(":contract_reference", contractReference);

export const getStripe3dSecureIframePath = (contractReference) =>
  STRIPE_3D_SECURE_IFRAME.replace(":contract_reference", contractReference);

export const getStripe3dSecureResponsePath = (contractReference) =>
  STRIPE_3D_SECURE_RESPONSE.replace(":contract_reference", contractReference);

const getQueryParams = (data) =>
  data && objectHasProperties(data) ? jsonToQueryString(data) : "";

export const getSignInFromPath = (data) =>
  SIGN_IN_FROM_PATH + getQueryParams(data);
