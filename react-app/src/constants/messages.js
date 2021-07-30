import { defineMessages, FormattedMessage } from "react-intl";
import React from "react";
export const CATEGORIES_TITLES_WITH_TRANSLATION_AVAILABLE = [
  "Actores",
  "Adultos",
  "Bailarines",
  "Coach",
  "Comediantes",
  "Deportistas",
  "Doblaje",
  "Fitness",
  "Imitadores",
  "Influencers",
  "Modelos",
  "Motivacional",
  "Músicos",
  "Otros",
  "Periodistas",
  "Presentadores",
  "Tiktok",
];

export const labelMessagesForCategoriesFilter = defineMessages({
  Actores: { defaultMessage: "Actores/Actrices" },
  Adultos: { defaultMessage: "Adultos" },
  Bailarines: { defaultMessage: "Bailarines" },
  Coach: { defaultMessage: "Coach" },
  Comediantes: { defaultMessage: "Comediantes" },
  Deportistas: { defaultMessage: "Deportistas" },
  Doblaje: { defaultMessage: "Doblaje" },
  Fitness: { defaultMessage: "Fitness" },
  Imitadores: { defaultMessage: "Imitadores" },
  Influencers: { defaultMessage: "Influencers" },
  Modelos: { defaultMessage: "Modelos" },
  Motivacional: { defaultMessage: "Motivacional" },
  Músicos: { defaultMessage: "Músicos" },
  Otros: { defaultMessage: "Otros" },
  Periodistas: { defaultMessage: "Periodistas" },
  Presentadores: { defaultMessage: "Presentadores" },
  Tiktok: { defaultMessage: "Tiktok" },
});

export const COUNTRY_CODE_WITH_TRANSLATIONS_AVAILABLE = [
  "ARG",
  "BOL",
  "BRA",
  "CHL",
  "COL",
  "CRI",
  "CUB",
  "DOM",
  "ECU",
  "FRA",
  "HND",
  "MEX",
  "MDA",
  "NIC",
  "PAN",
  "PRY",
  "PER",
  "PRI",
  "ESP",
  "UKR",
  "USA",
  "URY",
  "VEN",
];
export const labelMessagesForCountryCodeFilter = defineMessages({
  ARG: { defaultMessage: "Argentina" },
  BOL: { defaultMessage: "Bolivia (Plurinational State of)" },
  BRA: { defaultMessage: "Brazil" },
  CHL: { defaultMessage: "Chile" },
  COL: { defaultMessage: "Colombia" },
  CRI: { defaultMessage: "Costa Rica" },
  CUB: { defaultMessage: "Cuba" },
  DOM: { defaultMessage: "Dominican Republic (the)" },
  ECU: { defaultMessage: "Ecuador" },
  FRA: { defaultMessage: "France" },
  HND: { defaultMessage: "Honduras" },
  MEX: { defaultMessage: "Mexico" },
  MDA: { defaultMessage: "Moldova (the Republic of)" },
  NIC: { defaultMessage: "Nicaragua" },
  PAN: { defaultMessage: "Panama" },
  PRY: { defaultMessage: "Paraguay" },
  PER: { defaultMessage: "Peru" },
  PRI: { defaultMessage: "Puerto Rico" },
  ESP: { defaultMessage: "Spain" },
  UKR: { defaultMessage: "Ukraine" },
  USA: { defaultMessage: "United States of America (the)" },
  URY: { defaultMessage: "Uruguay" },
  VEN: { defaultMessage: "Venezuela (Bolivarian Republic of)" },
});

export const returnPaymentStatusLabel = (status) => {
  switch (status) {
    case 10:
      return [
        <FormattedMessage defaultMessage="Pago creado" />,
        "far fa-check-circle",
      ];
    case 20:
      return [
        <FormattedMessage defaultMessage="Pago cancelado" />,
        "far fa-window-close",
      ];
    case 30:
      return [
        <FormattedMessage defaultMessage="Pago rechazado" />,
        "fas fa-ban",
      ];
    case 40:
      return [
        <FormattedMessage defaultMessage="Pago pendiente" />,
        "far fa-clock",
      ];
    case 50:
      return [
        <FormattedMessage defaultMessage="Reembolso fallido" />,
        "fas fa-ban",
      ];
    case 55:
      return [
        <FormattedMessage defaultMessage="Falló autorización de cobro" />,
        "fas fa-ban",
      ];
    case 60:
      return [
        <FormattedMessage defaultMessage="Cobro fallido" />,
        "fas fa-ban",
      ];
    case 70:
      return [
        <FormattedMessage defaultMessage="Reembolso exitoso" />,
        "far fa-check-circle",
      ];
    case 80:
      return [
        <FormattedMessage defaultMessage="Pago expirado" />,
        "far fa-clock",
      ];
    case 90:
      return [
        <FormattedMessage defaultMessage="Pago autorizado" />,
        "far fa-check-circle text-success",
      ];
    case 100:
      return [
        <FormattedMessage defaultMessage="Pago completado" />,
        "far fa-check-circle text-success",
      ];
    default:
      return ["", ""];
  }
};

export const AVAILABLE_PAYMENTS_METHODS = {
  CREDIT_CARD: <FormattedMessage defaultMessage="Tarjeta de Crédito" />,
  DEBIT_CARD: <FormattedMessage defaultMessage="Tarjeta de Débito" />,
  BANK_TRANSFER: <FormattedMessage defaultMessage="Transferencia Bancaria" />,
  TICKET: <FormattedMessage defaultMessage="Efectivo" />,
  PAYPAL: <FormattedMessage defaultMessage="Paypal" />,
};
export const AVAILABLE_DOCUMENTS_NAME_FOR_COUNTRIES = [
  "MXN",
  "COP",
  "ARS",
  "USD",
  "BOB",
  "CRC",
  "GTQ",
];

export const DOCUMENT_NAME_FOR_COUNTRIES = defineMessages({
  MXN: { defaultMessage: "CURP" },
  COP: { defaultMessage: "CC" },
  ARS: { defaultMessage: "DNI o CUIT" },
  USD: { defaultMessage: "Social Security Number / SSN" },
  BOB: { defaultMessage: "CI" },
  CRC: { defaultMessage: "CI" },
  GTQ: { defaultMessage: "CUI" },
});

export const LOGIN_ERROR_MESSAGES_WITH_TRANSLATIONS_AVAILABLE = [
  "Invalid email",
  "Password field is required",
  "invalid credentials",
];

export const TRANSLATION_LOGIN_ERROR_MESSAGES = defineMessages({
  "Invalid email": { defaultMessage: "Email invalido." },
  "Password field is required": {
    defaultMessage: "El campo de contraseña es obligatorio",
  },
  "invalid credentials": {
    defaultMessage: "credenciales invalidas",
  },
  "this email isn't registered in famosos.com": {
    defaultMessage: "Este correo electrónico no esta registrado en famosos.com",
  },
  unexpectedError: { defaultMessage: "Ha ocurrido un error inesperado" },
});

export const SIGN_UP_ERROR_MESSAGES_WITH_TRANSLATIONS_AVAILABLE = [
  "Name field is required",
  "Birthdate field is required",
  "Invalid email",
  "Password length must contains least 6 characters",
  "Passwords do not match",
  "this email is already registered in famosos.com",
];

export const TRANSLATION_SIGN_UP_ERROR_MESSAGES = defineMessages({
  "Name field is required": {
    defaultMessage: "El campo de nombre es obligatorio",
  },
  "Birthdate field is required": {
    defaultMessage: "El campo de fecha de nacimiento es obligatorio",
  },
  "Invalid email": {
    defaultMessage: "Correo invalido",
  },
  "Password length must contains least 6 characters": {
    defaultMessage:
      "La longitud de la contraseña debe ser al menos 6 caracteres",
  },
  "Passwords do not match": {
    defaultMessage: "Las contraseñas no coinciden",
  },
  "this email is already registered in famosos.com": {
    defaultMessage: "Este correo electrónico ya se encuentra registrado",
  },
  unexpectedError: { defaultMessage: "Ha ocurrido un error inesperado" },
  under13YearsOld: {
    defaultMessage: "Debes poseer al menos 13 años de edad para registrarte",
  },
});

export const RESET_PASSSWORD_MESSAGES_WITH_TRANSLATIONS_AVAILABLE = [
  "this email isn't registered in famosos.com",
  "invalid credentials",
];

export const TRANSLATION_RESET_PASSSWORD_MESSAGES = defineMessages({
  "this email isn't registered in famosos.com": {
    defaultMessage: "Este correo electrónico no esta registrado en famosos.com",
  },
  "invalid credentials": {
    defaultMessage: "Credenciales invalidas.",
  },
});
