import {
  availableActionButtonsBackgroundColors,
  availableCardColors,
  availablePageBackgroundsUrls,
} from "constants/hiring-preview-configuration";

type HiringPreviewConfigurationType = {
  contractReference?: string;
  cardTitle?: string; // Cada ocasión tiene un predeterminado
  cardMessage?: string; // Cada ocasión tiene un predeterminado
  cardColor?: typeof availableCardColors[number];
  pageBackgroundUrl?: typeof availablePageBackgroundsUrls[number];
  actionButtonsBackgroundColor?: typeof availableActionButtonsBackgroundColors[number];
};

export default HiringPreviewConfigurationType;
