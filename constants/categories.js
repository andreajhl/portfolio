import { defineMessage } from "react-intl";

const byId = (previous, next) => previous.id - next.id;

export const categories = [
  {
    id: 4,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "ACTORES",
    title: defineMessage({ defaultMessage: "Actores/Actrices" }),
    keywords: ["actriz", "actor", "director"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FActores.png?alt=media&token=5da749f8-9203-41bd-a962-dd24b0549718",
  },
  {
    id: 21,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "ADULTOS",
    title: defineMessage({ defaultMessage: "Adultos" }),
    keywords: ["Adultos"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FAdultos.png?alt=media&token=a1b2013f-9753-4891-a173-05c94449bd6a",
  },
  {
    id: 25,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "BAILARINES",
    title: defineMessage({ defaultMessage: "Bailarines" }),
    keywords: ["Danza", "Bailarines"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FBailarines.png?alt=media&token=6a7c6638-0d88-4b91-8897-33e691663f50",
  },
  {
    id: 30,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "CHEFS",
    title: defineMessage({ defaultMessage: "Chefs" }),
    keywords: ["Chefs"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FChefs.png?alt=media&token=2073167f-7c93-4eae-bbe3-8b2d615d6d32",
  },
  {
    id: 8,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "COACH",
    title: defineMessage({ defaultMessage: "Coach" }),
    keywords: ["coach"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FCoaching.png?alt=media&token=48aa657a-fd47-4842-83ee-e99977ff1342",
  },
  {
    id: 3,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "COMEDIANTES",
    title: defineMessage({ defaultMessage: "Comediantes" }),
    keywords: ["humorista", "comediante", "cuentista"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FComediantes.png?alt=media&token=73a7997a-4e04-4f75-b27f-77c5cac88b4f",
  },
  {
    id: 24,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "DEPORTISTAS",
    title: defineMessage({ defaultMessage: "Deportistas" }),
    keywords: [
      "Deportistas",
      "Futbolista",
      "Presentador Deportivo",
      "Narrador",
    ],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FDeportistas.png?alt=media&token=fecc1f5c-fce4-4b0b-9467-d3d23564d455",
  },
  {
    id: 28,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "DOBLAJE",
    title: defineMessage({ defaultMessage: "Doblaje" }),
    keywords: ["Doblaje"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FDoblaje.png?alt=media&token=919343f0-6408-4be1-8509-5fb524e5dbe5",
  },
  {
    id: 22,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "FITNESS",
    title: defineMessage({ defaultMessage: "Fitness" }),
    keywords: ["fitness", "training"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FFitness.png?alt=media&token=a35fe82c-a867-47d3-ae90-0a3cefa27c61",
  },
  {
    id: 16,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "IMITADORES",
    title: defineMessage({ defaultMessage: "Imitadores" }),
    keywords: ["imitador"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FImitadores.png?alt=media&token=9ba974bd-524c-41ac-a692-8582c9421b8e",
  },
  {
    id: 2,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "INFLUENCERS",
    title: defineMessage({ defaultMessage: "Influencers" }),
    keywords: ["youtuber", "instagramer"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FInfluencers.png?alt=media&token=74dd96bf-38f6-482e-bebe-e4daa2efe217",
  },
  {
    id: 6,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "MODELOS",
    title: defineMessage({ defaultMessage: "Modelos" }),
    keywords: ["modelos"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FModelos.png?alt=media&token=ec533d7d-1a3d-4d9e-801c-63a87867a7d7",
  },
  {
    id: 7,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "MOTIVACIONAL",
    title: defineMessage({ defaultMessage: "Motivacional" }),
    keywords: ["autoayuda", "motivacion"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FMotivacional.png?alt=media&token=38d6cab7-b5e0-4810-a335-3150c8694c19",
  },
  {
    id: 5,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "MUSICOS",
    title: defineMessage({ defaultMessage: "Músicos" }),
    keywords: ["cantante", "musico", "compositor"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FMu%CC%81sicos.png?alt=media&token=ab36b3bc-d53f-4f74-8071-f0f6f6bd1d55",
  },
  {
    id: 23,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "OTROS",
    title: defineMessage({ defaultMessage: "Otros" }),
    keywords: ["Otros"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FOtros.png?alt=media&token=cbe4450c-e993-4206-b75a-d2de409a3d39",
  },
  {
    id: 27,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "PERIODISTAS",
    title: defineMessage({ defaultMessage: "Periodistas" }),
    keywords: ["Prensa", "Periodista"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FPeriodistas.png?alt=media&token=cce506e1-b236-4a1b-a3e5-141b0de7af77",
  },
  {
    id: 13,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "PRESENTADORES",
    title: defineMessage({ defaultMessage: "Presentadores" }),
    keywords: ["presentador", "presentadoras"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FPresentadores.png?alt=media&token=0d9f3e42-251c-4013-8d5e-ef9bfb5f762d",
  },
  {
    id: 29,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "TIKTOK",
    title: defineMessage({ defaultMessage: "Tiktok" }),
    keywords: ["TikTok", "TikToker"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FTiktokers.png?alt=media&token=2109b64a-d95c-4dba-8b39-aca0e551db3b",
  },
  {
    id: 26,
    createdAt: "0001-01-01T00:00:00Z",
    updatedAt: "0001-01-01T00:00:00Z",
    deletedAt: null,
    codename: "YOUTUBER",
    title: defineMessage({ defaultMessage: "Youtuber" }),
    keywords: ["Youtuber"],
    image:
      "https://firebasestorage.googleapis.com/v0/b/famosos-users-app.appspot.com/o/celebrity-categories%2FYoutubers.png?alt=media&token=6432d5b1-3c71-4984-a998-67e4bade750d",
  },
].sort(byId);
