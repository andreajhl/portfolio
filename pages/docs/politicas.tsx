import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { PoliciesPage } from "react-app/src/components/pages/policies";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titlePolicies: {
    defaultMessage: "Famosos.com - Política de privacidad",
  },
});
const Policies = () => {
  return (
    <>
      <CustomHead title={headData.titlePolicies} />
      <PoliciesPage />
    </>
  );
};

export default Policies;
