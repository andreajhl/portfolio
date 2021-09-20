export type CelebritySectionType = {
  id: number;
  title: string;
  celebritySectionType:
    | "CELEBRITY_CARD"
    | "MAIN_VIDEO_1"
    | "MAIN_VIDEO_2"
    | "CATEGORY_CARD";
  position: number;
  celebrities: any[];
};
