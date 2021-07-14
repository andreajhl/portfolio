export const testPaymentMethodsAvailable = [
  {
    paymentMethodType: "CREDIT_CARD",
    availablePaymentMethods: [
      {
        id: 5,
        identifier: "CARD",
        name: "Mastercard",
        brand: "MC",
        redirect: false,
        logo: "https://pay.dlocal.com/views/2.0/images/payments/MC.png",
      },
      {
        id: 2,
        identifier: "CARD",
        name: "Visa",
        brand: "VI",
        redirect: false,
        logo: "https://pay.dlocal.com/views/2.0/images/payments/VI.png",
      },
    ],
  },
  {
    paymentMethodType: "PAYPAL",
    availablePaymentMethods: [
      {
        id: 56,
        identifier: "PAYPAL",
        name: "Paypal",
        brand: "",
        redirect: false,
        logo: "https://famosos-media.s3.amazonaws.com/Logo_paypal.jpg",
      },
    ],
  },
  {
    paymentMethodType: "BANK_TRANSFER",
    availablePaymentMethods: [
      {
        id: 6,
        identifier: "PC",
        name: "PSE",
        brand: "",
        redirect: true,
        logo: "https://pay.dlocal.com/views/2.0/images/payments/PC.png",
      },
    ],
  },
  {
    paymentMethodType: "TICKET",
    availablePaymentMethods: [
      {
        id: 7,
        identifier: "EY",
        name: "Efecty",
        brand: "",
        redirect: true,
        logo: "https://pay.dlocal.com/views/2.0/images/payments/EY.png",
      },
      {
        id: 203,
        identifier: "DA",
        name: "Davivienda",
        brand: "DA",
        redirect: true,
        logo: "https://pay.dlocal.com/views/2.0/images/payments/DA.png",
      },
      {
        id: 8,
        identifier: "BU",
        name: "Baloto",
        brand: "",
        redirect: true,
        logo: "https://pay.dlocal.com/views/2.0/images/payments/BU.png",
      },
    ],
  },
];
