const apiVersion = "v1";

export const SIGN_IN_REQUEST = `api/${apiVersion}/auth/clients/sign-in/`;
export const CHANGE_PASSWORD = `api/${apiVersion}/auth/change-password/`;

export const CREATE_ACCOUNT_TO_VALIDATE_BY_SMS = `api/${apiVersion}/auth/clients/create-account-to-validate-by-sms/`;
export const CREATE_CLIENT_PASSWORD = `api/${apiVersion}/auth/clients/create-password/`;

export const VALIDATE_SMS_SECURITY_CODE = `api/${apiVersion}/auth/clients/validate-sms-security-code/`;
export const CREATE_ACCOUNT_TO_VALIDATE_BY_EMAIL = `api/${apiVersion}/auth/clients/create-account-to-validate-by-email/`;
export const VALIDATE_EMAIL_SECURITY_CODE = `api/${apiVersion}/auth/clients/validate-email-security-code/`;
export const VALIDATE_IF_EMAIL_IS_REGISTERED = `api/${apiVersion}/auth/clients/validate-if-email-is-registered/`;
export const RESET_PASSWORD = `api/${apiVersion}/auth/clients/reset-password/`;
export const COMPLETE_PROFILE = `api/${apiVersion}/auth/clients/complete-profile/`;
