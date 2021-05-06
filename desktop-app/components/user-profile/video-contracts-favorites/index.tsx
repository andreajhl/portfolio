import React from "react";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import CelebritySectionVideoCard from "desktop-app/components/layouts/celebrity-section-video-card";
import styles from "./styles.module.scss";

const mockData = [
  {
    id: 609,
    fullName: "Enrique Arce Testing",
    username: "enriquearce",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/609/avatar/famosos-videos-personalizados-enriquearce-compressed.jpg",
    mainVideo:
      "https://dqb0851cl2gjs.cloudfront.net/main-videos/609/famosos-videos-personalizados-enriquearce-crf-video-watermark480.mp4",
    hashtags: ["Actor", "LaCasaDePapel", "Arturo", "Arturito", "Moneyheist"],
    title: "Actores",
    categoryId: 4,
    videoMessagePrice: 125,
    discountPercentage: 0.2,
    countryCode: "ESP",
    countryId: 11,
    countryName: "Spain",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: false,
    availableForSubscriptions: false,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/609/7310/famosos-videos-personalizados-enriquearce-202011032150-1933443-7310-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/609/7310/famosos-videos-personalizados-enriquearce-202011032150-1933443-7310-crf-video-watermark480.mp4",
    occasion: "🙌🏻 Gratitud",
  },
  {
    id: 864,
    fullName: "Mark Tacher Testing",
    username: "marktacher",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/864/avatar/famosos-videos-personalizados-marktacher-compressed.jpg",
    mainVideo:
      "https://famosos-output-media-testing.s3.amazonaws.com/main-videos/864/famosos-videos-personalizados-marktacher-crf-video480.mp4",
    hashtags: ["Actor", "TvHost", "CDMX"],
    title: "Actores",
    categoryId: 4,
    videoMessagePrice: 100,
    discountPercentage: 0,
    countryCode: "MEX",
    countryId: 25,
    countryName: "Mexico",
    showSimilarCelebrities: true,
    availableForFlashDeliveries: true,
    availableForSubscriptions: true,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/864/7019/famosos-videos-personalizados-marktacher-202010281802-4876151-7019-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/864/7019/famosos-videos-personalizados-marktacher-202010281802-4876151-7019-crf-video-watermark480.mp4",
    occasion: "🎉 Cumpleaños",
  },
  {
    id: 1107,
    fullName: "Andrés Cepeda Testing",
    username: "andrescepeda",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/1107/avatar/famosos-videos-personalizados-andrescepeda-compressed.jpg",
    mainVideo:
      "https://dqb0851cl2gjs.cloudfront.net/main-videos/1107/famosos-videos-personalizados-andrescepeda-crf-video480.mp4",
    hashtags: ["cepeda", "topartist", "mevoy", "embrujo", "voyaextrañarte"],
    title: "Músicos",
    categoryId: 5,
    videoMessagePrice: 125,
    discountPercentage: 0,
    countryCode: "COL",
    countryId: 30,
    countryName: "Colombia",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: true,
    availableForSubscriptions: true,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/1107/7506/famosos-videos-personalizados-andrescepeda-202011061712-0070947-7506-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/1107/7506/famosos-videos-personalizados-andrescepeda-202011061712-0070947-7506-crf-video-watermark480.mp4",
    occasion: "❤️ Amor",
  },
  {
    id: 35,
    fullName: "Pibe Valderrama Testing",
    username: "pibevalderrama",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/35/avatar/famosos-videos-personalizados-pibevalderrama-compressed.jpg",
    mainVideo:
      "https://dqb0851cl2gjs.cloudfront.net/main-videos/35/famosos-videos-personalizados-pibevalderrama-crf-video-watermark480.mp4",
    hashtags: [
      "futbol",
      "colombia",
      "seleccioncolombia",
      "copaamerica",
      "instasoccer",
      "worldcupfever",
      "copadomundo",
    ],
    title: "Deportistas",
    categoryId: 24,
    videoMessagePrice: 100,
    discountPercentage: 0.5,
    countryCode: "COL",
    countryId: 30,
    countryName: "Colombia",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: false,
    availableForSubscriptions: false,
    status: 60,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/35/7625/famosos-videos-personalizados-pibevalderrama-202011091756-7448040-7625-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/35/7625/famosos-videos-personalizados-pibevalderrama-202011091756-7448040-7625-crf-video-watermark480.mp4",
    occasion: "🎄 Felices fiestas",
  },
  {
    id: 301,
    fullName: "Rolando Schiavi Testing",
    username: "rolandoschiavi",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/301/avatar/famosos-videos-personalizados-rolandoschiavi-compressed.jpg",
    mainVideo:
      "https://dqb0851cl2gjs.cloudfront.net/main-videos/301/famosos-videos-personalizados-rolandoschiavi-crf-video-watermark480.mp4",
    hashtags: ["Futbol"],
    title: "Deportistas",
    categoryId: 24,
    videoMessagePrice: 15,
    discountPercentage: 0,
    countryCode: "ARG",
    countryId: 27,
    countryName: "Argentina",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: false,
    availableForSubscriptions: false,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/301/6791/famosos-videos-personalizados-rolandoschiavi-202010221518-5741233-6791-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/301/6791/famosos-videos-personalizados-rolandoschiavi-202010221518-5741233-6791-crf-video-watermark480.mp4",
    occasion: "⚡ Motivación",
  },
  {
    id: 648,
    fullName: "Tino Asprilla Testing",
    username: "tinoasprilla",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/648/avatar/famosos-videos-personalizados-tinoasprilla-compressed.jpg",
    mainVideo:
      "https://dqb0851cl2gjs.cloudfront.net/main-videos/648/famosos-videos-personalizados-tinoasprilla-crf-video-watermark480.mp4",
    hashtags: ["Futbolista", "Colombia"],
    title: "Deportistas",
    categoryId: 24,
    videoMessagePrice: 40,
    discountPercentage: 0,
    countryCode: "COL",
    countryId: 30,
    countryName: "Colombia",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: false,
    availableForSubscriptions: false,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/648/7502/famosos-videos-personalizados-tinoasprilla-202011061537-4178878-7502-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/648/7502/famosos-videos-personalizados-tinoasprilla-202011061537-4178878-7502-crf-video-watermark480.mp4",
    occasion: "⚡ Motivación",
  },
  {
    id: 367,
    fullName: "Vanessa Guzman Testing",
    username: "vanessaguzman",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/367/avatar/famosos-videos-personalizados-vanessaguzman-compressed.jpg",
    mainVideo:
      "https://dqb0851cl2gjs.cloudfront.net/main-videos/367/famosos-videos-personalizados-vanessaguzman-crf-video-watermark480.mp4",
    hashtags: [
      "actriz",
      "NuestraBellezaMéxico1996",
      "Telenovelas",
      "AmorMío",
      "Comedia",
      "Mexicana",
    ],
    title: "Actores",
    categoryId: 4,
    videoMessagePrice: 25,
    discountPercentage: 0,
    countryCode: "MEX",
    countryId: 25,
    countryName: "Mexico",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: false,
    availableForSubscriptions: false,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/367/5767/famosos-videos-personalizados-vanessaguzman-202010021816-2046110-5767-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/367/5767/famosos-videos-personalizados-vanessaguzman-202010021816-2046110-5767-crf-video-watermark480.mp4",
    occasion: "🎉 Cumpleaños",
  },
  {
    id: 5,
    fullName: "Victor Muñoz Testing",
    username: "victormunoz",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/5/avatar/famosos-videos-personalizados-victormunoz-compressed.jpg",
    mainVideo:
      "https://dqb0851cl2gjs.cloudfront.net/main-videos/5/famosos-videos-personalizados-victormunoz-crf-video-watermark480.mp4",
    hashtags: ["Cantante", "Compositor", "Productor", "MiPrincesa"],
    title: "Músicos",
    categoryId: 5,
    videoMessagePrice: 40,
    discountPercentage: 0.1,
    countryCode: "VEN",
    countryId: 31,
    countryName: "Venezuela (Bolivarian Republic of)",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: false,
    availableForSubscriptions: false,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/5/6844/famosos-videos-personalizados-victormunoz-202010231416-5075136-6844-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/5/6844/famosos-videos-personalizados-victormunoz-202010231416-5075136-6844-crf-video-watermark480.mp4",
    occasion: "🎉 Cumpleaños",
  },
  {
    id: 128,
    fullName: "Pirry Testing",
    username: "pirry",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/128/avatar/famosos-videos-personalizados-pirry-compressed.jpg",
    mainVideo:
      "https://dqb0851cl2gjs.cloudfront.net/main-videos/128/famosos-videos-personalizados-pirry-crf-video-watermark480.mp4",
    hashtags: [
      "elmundosegunpirry",
      "especialespirry",
      "aventura",
      "cronicas",
      "periodismo",
      "viajes",
      "naturaleza",
    ],
    title: "Presentadores",
    categoryId: 13,
    videoMessagePrice: 80,
    discountPercentage: 0,
    countryCode: "COL",
    countryId: 30,
    countryName: "Colombia",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: false,
    availableForSubscriptions: false,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/128/5329/famosos-videos-personalizados-pirry-202009231715-6466177-5329-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/128/5329/famosos-videos-personalizados-pirry-202009231715-6466177-5329-crf-video-watermark480.mp4",
    occasion: "🎓 Graduación",
  },
  {
    id: 957,
    fullName: "Maía Testing",
    username: "maia",
    avatar:
      "https://dqb0851cl2gjs.cloudfront.net/celebrities/957/avatar/famosos-videos-personalizados-maia-compressed.jpg",
    mainVideo:
      "https://firebasestorage.googleapis.com/v0/b/famosos-27f08.appspot.com/o/videos%2F957%2Fimage_picker6738699837837863208.jpg?alt=media&token=7a585df4-0bdf-44e3-b4b3-c2af02c08215",
    hashtags: ["Maia", "Colombia"],
    title: "Músicos",
    categoryId: 5,
    videoMessagePrice: 50,
    discountPercentage: 0,
    countryCode: "COL",
    countryId: 30,
    countryName: "Colombia",
    showSimilarCelebrities: false,
    availableForFlashDeliveries: false,
    availableForSubscriptions: false,
    status: 50,
    videoPosterUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/957/6715/famosos-videos-personalizados-maia-202010202129-4591157-6715-crf-video-poster480.jpg",
    videoUrl:
      "https://d3dxo4xx2lwk55.cloudfront.net/videos/957/6715/famosos-videos-personalizados-maia-202010202129-4591157-6715-crf-video-watermark480.mp4",
    occasion: "🎉 Cumpleaños",
  },
];

function VideoContractsFavorites() {
  return (
    <div className={styles.VideoContractsFavoritesWrapper}>
      <CardsReelSection
        title={<h2 className={styles.ContainerTitle}>Video Favoritos</h2>}
        itemWidth={263}
        itemHeight={402}
        buttonsStyle={{
          size: 49,
          top: 171,
          transform: "translateY(-50%)",
        }}
        gap={26.75}
        itemCount={mockData.length}
        itemData={mockData}
      >
        {(data) => (
          <CelebritySectionVideoCard
            occasion={data.occasion}
            username={data.username}
            videoUrl={data.videoUrl}
            fullName={data.fullName}
            videoPosterUrl={data.videoPosterUrl}
            avatar={data.avatar}
          />
        )}
      </CardsReelSection>
    </div>
  );
}

export default VideoContractsFavorites;
