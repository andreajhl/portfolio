import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { MaintenancePage } from "react-app/src/components/pages/maintenance";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleMaintenance: {
    defaultMessage: "Famosos.com - En mantenimiento"
  }
});

const MAINTENANCE_IS_ACTIVE =
  process.env.NEXT_PUBLIC_ACTIVE_MAINTENANCE === "true";

export const getServerSideProps: GetServerSideProps = async () => {
  if (!MAINTENANCE_IS_ACTIVE) {
    return { redirect: { destination: ROOT_PATH, permanent: false } };
  }
  return { props: {} };
};

function Maintenance() {
  return (
    <>
      <CustomHead title={headData.titleMaintenance}></CustomHead>
      <MaintenancePage />
    </>
  );
}

export default Maintenance;
