export function validateDeliveryTo(value: string) {
  if (value.length === 0) return "Debes introducir un nombre";
  if (value.length > 40) {
    return "Debes introducir un máximo de 40 caracteres.";
  }
}

export function validateDeliveryFrom(
  value: string,
  { values: { contractType } }
) {
  if (contractType !== 2) return;
  if (value.length === 0) return "Debes introducir un nombre";
  if (value.length > 40) {
    return "Debes introducir un máximo de 40 caracteres.";
  }
}

export function validateInstructions(value: string) {
  if (value.length === 0) return "Debes escribir tus instrucciones.";
  if (value.length > 300) {
    return "Debes introducir un máximo de 300 caracteres.";
  }
}

export function validateDeliveryContactCellphone(value: string) {
  if (value.length <= 4) return "Ingresa un número de teléfono válido.";
}
