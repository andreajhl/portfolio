export const ROOT_PATH = '/celebrities/';
export const NOT_FOUND_PATH = '/500-not-found';
export const NOT_AUTHORIZED_PATH = '/not-authorized';
export const CELEBRITY_PROFILE = '/:celebrity_username';
export const CONTRACT_CREATED = '/contract-created/:contract_reference';
export const LOGIN_PATH = '/login';
export const HOME_PATH = '/';
// AUTH
export const SIGN_IN_PATH = '/auth/sign-in/';
export const SIGN_IN_WITH_SPECIFIC_FORM_PATH = '/auth/sign-in/:form/';
export const SIGN_UP_PATH = '/auth/sign-up';
export const SIGN_UP_WITH_SPECIFIC_FORM_PATH = '/auth/sign-up/:form/';
export const VALIDATE_SECURITY_CODE = '/auth/validate-security-code/:form';

export const RESET_PASSWORD_PATH = '/auth/reset-password';
export const CHANGE_PASSWORD_PATH = '/auth/change-password';
export const CREATE_PASSWORD_PATH = '/auth/create-password';
export const COMPLETE_PROFILE_PATH = '/auth/complete-profile';


export const CLIENT_PROFILE = '/my-account/profile';
export const CLIENT_HIRINGS = '/my-account/hirings';
export const HIRING_PREVIEW = '/hirings/:contract_reference';
export const HIRING_PREVIEW_WITHOUT_SESSION = '/hirings/:contract_reference';
