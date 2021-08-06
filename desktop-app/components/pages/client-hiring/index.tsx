import PageContainer from "desktop-app/components/layouts/page-container";
import Maybe from "desktop-app/components/common/helpers/maybe";
import useGetUserContract from "../../../../lib/hooks/useGetUserContract";
import { GiftAnimationWrapper } from "desktop-app/components/layouts/gift-animation-wrapper";
import dynamic from "next/dynamic";
import ClientContractType from "desktop-app/types/clientContract";

const ClientHiringForOther = dynamic<{ contractData: ClientContractType }>(() =>
  import("desktop-app/components/client-hiring/client-hiring-for-other").then(
    (mod) => mod.ClientHiringForOther
  )
);

const GiftPreviewMain = dynamic<{ contract: ClientContractType }>(() =>
  import("desktop-app/components/layouts/gift-preview-main").then(
    (mod) => mod.GiftPreviewMain
  )
);

type ClientHiringPageProps = {
  contractReference: string;
};

function ClientHiringPage({ contractReference }: ClientHiringPageProps) {
  const { contract } = useGetUserContract(contractReference, true);

  return (
    <PageContainer showFooter={false} showSearchInMobile={false}>
      <GiftAnimationWrapper
        deliveryTo={contract.deliveryTo}
        deliveryFrom={contract.deliveryFrom}
      >
        <Maybe it={Boolean(contract.celebrityData)}>
          <Maybe
            it={contract.contractType === 1}
            orElse={<ClientHiringForOther contractData={contract} />}
          >
            <GiftPreviewMain contract={contract} />
          </Maybe>
        </Maybe>
      </GiftAnimationWrapper>
    </PageContainer>
  );
}

export { ClientHiringPage };
