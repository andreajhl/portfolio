export const AVAILABLE_CURRENCIES_FOR_PAYMENTS = [
  {
    name: "USD",
    label: "Dólares Americanos",
    symbol: "$",
    implemented_by_dlocal: true,
    flag: "/assets/img/usa.svg",
    document_name: "Social Security Number / SSN",
    decimal_separator: ".",
    thousand_separator: ",",
    round: "1"
  },
  {
    name: "ARS",
    label: "Pesos Argentinos",
    symbol: "$",
    implemented_by_dlocal: true,
    flag: "https://restcountries.eu/data/arg.svg",
    document_name: "Código Único de Identificación Tributaria",
    decimal_separator: ",",
    thousand_separator: ".",
    round: "100"
  },
  {
    name: "BRL",
    label: "Real Brasileño",
    symbol: "$",
    implemented_by_dlocal: true,
    flag: "https://restcountries.eu/data/bra.svg",
    document_name: "CPF o CNPJ",
    decimal_separator: ",",
    thousand_separator: ".",
    round: "5"
  },
  {
    name: "COP",
    label: "Pesos Colombianos",
    symbol: "$",
    implemented_by_dlocal: true,
    flag: "https://restcountries.eu/data/col.svg",
    document_name: "Cédula de Ciudadanía",
    decimal_separator: ",",
    thousand_separator: ".",
    round: "1000"
  },
  {
    name: "MXN",
    label: "Pesos Mexicanos",
    symbol: "$",
    implemented_by_dlocal: true,
    flag: "https://restcountries.eu/data/mex.svg",
    document_name: "Clave Única de Registro de Población",
    decimal_separator: ".",
    thousand_separator: ",",
    round: "5"
  }
];
