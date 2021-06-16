export const ROOT_PATH = "/";
export const HOME_PATH = "/inicio/";
export const LANDING_PATH = "/landing";
export const SEARCH_PATH = "/buscar";
export const CELEBRITY_PROFILE = "/:celebrity_username";
export const CELEBRITY_PROFILE_ERROR = "/:celebrity_username/404-not-found/";
export const CELEBRITY_PROFILE_CONTRACT = "/:celebrity_username/contratar";
export const PAYMENT_METHODS = "/payments-methods/:contract_reference";
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
export const HIRING_PREVIEW = "/hirings/:contract_reference";
export const HIRING_EDITOR = "/hirings/:contract_reference/editor";
export const HIRING_PREVIEW_WITHOUT_SESSION = "/hirings/:contract_reference";
// TRENDING
export const TRENDING = "/tendencias";
export const BLOG = "/blog";
export const BLOG_ENTRY = `${BLOG}/:id`;

//SUBSCRIPTION
export const CELEBRITY_SUBSCRIBE = "/:celebrity_username/club";
export const SUBSCRIPTION = "/subscription/subscribe/:celebrity_username";
export const SUBSCRIPTION_SUCCESS =
  "/subscription/subscription-success/:celebrity_username";
export const FEED_SUBSCRIPTION = "/subscription/feed";

//SESSION REDIRECT
export const SESSION_REDIRECT = "/session/redirect/";
//RESUMEN DE COMPRA
export const RESUMEN_DE_COMPRA = "/resumen-de-compra/:contract_reference";
//RESUMEN DE COMPRA
export const PURCHASE_SUMMARY = "/purchase-summary/:contract_reference";
