import PageContainer from "desktop-app/components/layouts/page-container";
import HiringPreviewConfigurationType from "desktop-app/types/hiringPreviewConfigurationType";
import styles from "./styles.module.scss";
import useGetContract from "lib/hooks/useGetContract";
import { GiftPreviewMain } from "desktop-app/components/layouts/gift-preview-main";
import { GiftAnimationWrapper } from "desktop-app/components/layouts/gift-animation-wrapper";

type GiftPreviewPageProps = {
  contractReference: string;
  hiringConfiguration?: HiringPreviewConfigurationType;
};

const mockHiringConfiguration: HiringPreviewConfigurationType = {
  cardTitle: "¡Feliz cumpleaños mi amor!",
  cardMessage:
    "Mi amor hermosa, te dedico esta canción con todo mi corazón.\nTe amo infinito. Que tengas un cumpleaños hermoso.\n\nCon todo mi amor, Luis.",
  cardColor: "#E8E8FF",
  pageBackgroundUrl: "/assets/img/hirings-preview-backgrounds/background-1.png",
  actionButtonsBackgroundColor: "#000000",
};

function GiftPreviewPage({
  contractReference,
  hiringConfiguration = mockHiringConfiguration,
}: GiftPreviewPageProps) {
  const { contract } = useGetContract(contractReference, true);

  return (
    <PageContainer showFooter={false}>
      <GiftAnimationWrapper
        deliveryTo={contract.deliveryTo}
        deliveryFrom={contract.deliveryFrom}
      >
        <GiftPreviewMain
          className={styles.HiringPreviewPageMain}
          contract={contract}
          hiringConfiguration={hiringConfiguration}
        />
      </GiftAnimationWrapper>
    </PageContainer>
  );
}

export { GiftPreviewPage };
