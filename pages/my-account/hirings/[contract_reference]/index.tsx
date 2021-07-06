import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { useDesktopClass } from "lib/hooks/useDesktopClass";
import useGlobalFetches from "lib/hooks/useGlobalFetches";
import { ClientHiringPage } from "desktop-app/components/pages/client-hiring";

export async function getServerSideProps({ params: { contract_reference } }) {
  return {
    props: {
      contractReference: contract_reference,
    },
  };
}

function HiringPreview({ contractReference }) {
  useDesktopClass(true);
  useGlobalFetches({
    shouldFetchUserCelebrityLikes: false,
    shouldFetchUserContractsLikes: true,
  });

  return (
    <>
      <CustomHead />
      <ClientHiringPage contractReference={contractReference} />
    </>
  );
}

export default HiringPreview;
