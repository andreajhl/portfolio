const apiVersion = "v1";
const MODEL_PATH = "custom-endpoints/users";

export const SIGN_IN_REQUEST = MODEL_PATH + "/login/email-password";
export const CREATE_ACCOUNT_TO_VALIDATE_BY_EMAIL =
  MODEL_PATH + "/create-account-to-validate-by-email";
export const VALIDATE_IF_EMAIL_IS_REGISTERED =
  MODEL_PATH + "/validate-if-email-is-registered";
export const VALIDATE_EMAIL_SECURITY_CODE =
  MODEL_PATH + "/validate-email-security-code";
export const CREATE_CLIENT_PASSWORD = MODEL_PATH + "/create-account-password";
export const COMPLETE_PROFILE = MODEL_PATH + "/complete-profile";
export const CHANGE_PASSWORD = MODEL_PATH + "/change-password";
export const RESET_PASSWORD = MODEL_PATH + "/reset-password";
export const CREATE_ACCOUNT_TO_VALIDATE_BY_SMS =
  MODEL_PATH + "/create-account-to-validate-by-sms";
export const VALIDATE_SMS_SECURITY_CODE =
  MODEL_PATH + "/validate-sms-security-code";
export const NEWSLETTER_SUBSCRIPTION = MODEL_PATH + "/newsletter-subscription";
export const NEWSLETTER_SUBSCRIBE = "custom-endpoints/newsletter/subscribe";
