import PageContainer from "desktop-app/components/layouts/page-container";
import { ClientHiringForOther } from "desktop-app/components/client-hiring/client-hiring-for-other";
import Maybe from "desktop-app/components/common/helpers/maybe";
import useGetContract from "../../../../lib/hooks/useGetContract";

type ClientHiringPageProps = {
  contractReference: string;
};

function ClientHiringPage({ contractReference }: ClientHiringPageProps) {
  const { contract } = useGetContract(contractReference, true);

  return (
    <PageContainer showFooter={false}>
      <Maybe it={contract.celebrityData && contract.contractType !== 2}>
        <ClientHiringForOther contractData={contract} />
      </Maybe>
    </PageContainer>
  );
}

export { ClientHiringPage };
