export const AVAILABLE_CURRENCIES_FOR_PAYMENTS = [
    {
        "name": "ARS",
        "label": "Pesos Argentinos",
        "symbol": "$",
        "implemented_by_dlocal": false,
        "flag": "https://restcountries.eu/data/arg.svg",
        "document_name":"DNI o CUIT",
        "decimal_separator":",",
        "thousand_separator":".",
        "round":"100"
    },
    {
        "name": "BRL",
        "label": "Real Brasileño",
        "symbol": "$",
        "implemented_by_dlocal": false,
        "flag": "https://restcountries.eu/data/bra.svg",
        "document_name":"CPF o CNPJ",
        "decimal_separator":",",
        "thousand_separator":".",
        "round":"5"
    },
    {
        "name": "COP",
        "label": "Pesos Colombianos",
        "symbol": "$",
        "implemented_by_dlocal": false,
        "flag": "https://restcountries.eu/data/col.svg",
        "document_name":"CC",
        "decimal_separator":",",
        "thousand_separator":".",
        "round":"1000"
    },
    {
        "name": "MXN",
        "label": "Pesos Mexicanos",
        "symbol": "$",
        "implemented_by_dlocal": true,
        "flag": "https://restcountries.eu/data/mex.svg",
        "document_name":"CURP",
        "decimal_separator":".",
        "thousand_separator":",",
        "round":"5"
    },
    {
        "name": "USD",
        "label": "Dólares",
        "symbol": "$",
        "implemented_by_dlocal": true,
        "flag": "/assets/img/usa.svg",
        "document_name":"SSN",
        "decimal_separator":".",
        "thousand_separator":",",
        "round":"1"
    },
];
