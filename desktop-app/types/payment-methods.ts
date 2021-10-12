import {
  ALL_AVAILABLE_PAYMENTS_METHODS,
  GATEWAYS,
} from "constants/availablePaymentsMethods";

export type PaymentMethodNameType = typeof ALL_AVAILABLE_PAYMENTS_METHODS[number];

export type PaymentMethodOption = {
  id: number;
  identifier: string;
  name: string;
  brand: string;
  redirect: boolean;
  logo: string;
};

export type BuyerDataType = {
  buyerFullName: string;
  buyerEmail: string;
  buyerDocument: string;
};

export type GatewayNameType = typeof GATEWAYS[number];
