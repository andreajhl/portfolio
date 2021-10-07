const apiVersion = "v1";

export const BASE_PATH = `api/${apiVersion}/payment-viewsets/`;

export const PROCESS_FREE_PAYMENT_PATH =
  "/custom-endpoints/user-payments/process-free-payment";

export const PROCESS_PAYMENT_PATH =
  "/custom-endpoints/user-payments/process-:gateway-payment";

export const getProcessPaymentPath = (gateway = "free") =>
  PROCESS_PAYMENT_PATH.replace(":gateway", gateway?.toLowerCase?.());
