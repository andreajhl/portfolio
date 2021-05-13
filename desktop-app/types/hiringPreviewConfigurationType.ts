import {
  availableCardColors,
  availablePageBackgroundsUrls,
} from "constants/hiring-preview-configuration";

type HiringPreviewConfigurationType = {
  cardTitle?: string; // Cada ocasión tiene un predeterminado
  cardMessage?: string; // Cada ocasión tiene un predeterminado
  cardColor?: typeof availableCardColors[number];
  pageBackgroundUrl?: typeof availablePageBackgroundsUrls[number];
};

export default HiringPreviewConfigurationType;
