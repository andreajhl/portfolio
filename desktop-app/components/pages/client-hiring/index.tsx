import PageContainer from "desktop-app/components/layouts/page-container";
import { ClientHiringForOther } from "desktop-app/components/client-hiring/client-hiring-for-other";
import Maybe from "desktop-app/components/common/helpers/maybe";
import useGetContract from "../../../../lib/hooks/useGetContract";
import { GiftAnimationWrapper } from "desktop-app/components/layouts/gift-animation-wrapper";

type ClientHiringPageProps = {
  contractReference: string;
};

function ClientHiringPage({ contractReference }: ClientHiringPageProps) {
  const { contract } = useGetContract(contractReference, true);

  return (
    <PageContainer showFooter={false}>
      <GiftAnimationWrapper
        deliveryTo={contract.deliveryTo}
        deliveryFrom={contract.deliveryFrom}
      >
        <Maybe it={contract.celebrityData && contract.contractType !== 2}>
          <ClientHiringForOther contractData={contract} />
        </Maybe>
      </GiftAnimationWrapper>
    </PageContainer>
  );
}

export { ClientHiringPage };
