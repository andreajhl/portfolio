const testContract = {
  reference: "202104202026-5858081-10173",
  price: 15,
  celebrity_full_name: "Jhon Vega Testing",
  celebrity_avatar:
    "https://famosos-output-media-testing.s3.amazonaws.com/celebrities/1448/avatar/famosos-videos-personalizados-jhonvegamas-compressed.jpeg",
  delivery_to: "German",
  delivery_from: "",
  instructions:
    "Hola Andrés, porfavor dile a Camila que la amo con todo mi corazón y cántale un pedazo de la canción “X”.",
  status: 5,
  // Data de los descuentos
  celebrity_id: 864,
  discount_percentage: 0,
  original_price: 15,
};

const testContractToPay = {
  isPublic: false,
  instructions: "test instructions",
  deliveryContact: "test@testing.com",
  deliveryContactCellphone: "",
  deliveryTo: "Ana",
  deliveryFrom: "Pedro",
  reference: "202104202026",
  status: 10,
  authorizationDate: "2021-04-20",
};

export { testContractToPay as contractToPay };

export default testContract;
