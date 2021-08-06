export const allowedFormatDocuments = {
  ARS: (value) =>
    new RegExp(/^([a-zA-Z0-9_-]){7,9}$|^([a-zA-Z0-9_-]){11}$/).test(value),
  COP: (value) => new RegExp(/^([a-zA-Z0-9_-]){6,10}$/).test(value),
  MXN: (value) => new RegExp(/^([a-zA-Z0-9_-]){10,18}$/).test(value),
  PEN: (value) => new RegExp(/^([a-zA-Z0-9_-]){8,9}$/).test(value),
  BRL: (value) =>
    new RegExp(
      /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/
    ).test(value),
  BOB: (value) => new RegExp(/^([a-zA-Z0-9_-]){5,20}$/).test(value),
  CLP: (value) => new RegExp(/^([a-zA-Z0-9_-]){8,9}$/).test(value),
  PYG: (value) => new RegExp(/^([a-zA-Z0-9_-]){5,20}$/).test(value),
  UYU: (value) => new RegExp(/^([a-zA-Z0-9_-]){6,8}$/).test(value),
  GTQ: (value) => new RegExp(/^([a-zA-Z0-9_-]){13}$/).test(value),
  CRC: (value) => new RegExp(/^([a-zA-Z0-9_-]){9}$/).test(value),
};
