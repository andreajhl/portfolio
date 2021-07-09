import ClientContractType from "desktop-app/types/clientContract";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import MyHiringsContract from "desktop-app/types/myHiringsContract";

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

export const testLastPayment = {
  id: 1,
  createdAt: "1976-05-25T22:40:30.248Z",
  price: 3,
  status: 10,
  transactionChargeId: "1976",
  paymentMethodLogo: "1976",
};

export const testMyHiringsContract: MyHiringsContract = {
  id: 10631,
  contractType: 1,
  deliveryContact: "german@famosos.com",
  deliveryType: 1,
  isPublic: true,
  occasion: "BIRTHDAY",
  celebrityId: 864,
  reference: "202107081511-6596318-10631",
  status: 10,
  deliveryTo: "German",
  deliveryFrom: "",
  instructions:
    "¡Hola Mark Tacher Testing! El 23 cumplo 12 años y quisiera que por favor me felicites. Soy tu fan y me encanta lo que haces.",
  stars: 0,
  review: "",
  deliveryContactCellphone: "",
  creationDate: "2021-07-08T11:11:16.196532-04:00",
  paymentDate: "2021-07-08T14:27:57.758898-04:00",
  recordingDate: "0001-01-01T00:00:00Z",
  celebrityData: {
    id: 864,
    username: "marktacher",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/864/avatar/famosos-videos-personalizados-marktacher-compressed.jpg",
    fullName: "Mark Tacher Testing",
  },
  userId: 462,
};

export const testClientContract: ClientContractType = {
  celebrityData: {
    id: 864,
    username: "marktacher",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/864/avatar/famosos-videos-personalizados-marktacher-compressed.jpg",
    fullName: "Mark Tacher Testing",
  },
  userData: {
    id: 462,
  },
  id: 10244,
  contractType: 2,
  deliveryContact: "german@famosos.com",
  deliveryType: 1,
  isPublic: true,
  occasion: "SPECIAL_OCCASION",
  userId: 462,
  celebrityId: 864,
  reference: "202105142053-3818062-10244",
  status: 40,
  deliveryTo: "Adrían",
  media:
    "https://famosos-output-videos-testing.s3.amazonaws.com/videos/864/10244/famosos-videos-personalizados-marktacher-202105142053-3818062-10244-crf-video-watermark480.mp4",
  mediaPosterUrl:
    "https://famosos-output-videos-testing.s3.amazonaws.com/videos/864/10244/famosos-videos-personalizados-marktacher-202105142053-3818062-10244-crf-video-poster480.jpg",
  deliveryFrom: "German",
  instructions:
    "¡Hola Mark Tacher Testing! Me encantaría sorprender a Adrían en esta graduación de bachillerato.",
  stars: 0,
  review: "",
  deliveryContactCellphone: "57412520585",
};

export const testHiringConfiguration: HiringPreviewConfigurationType = {
  contractReference: "202105142053-3818062-10244",
  cardTitle: "Feliz Cumpleaños german Andres Solano Salazar asda",
  cardMessage:
    "Probvando proasdaksdasdhjasdjashdjasdj asjda shkdahsj asdja sdasd",
  cardColor: "#E8E8FF",
  pageBackgroundUrl: "/assets/img/hirings-preview-backgrounds/background-1.png",
  actionButtonsBackgroundColor: "#000000",
};

export { testContractToPay as contractToPay };

export default testContract;
