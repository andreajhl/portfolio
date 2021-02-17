export const AVAILABLE_CURRENCIES_FOR_PAYMENTS = [
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
