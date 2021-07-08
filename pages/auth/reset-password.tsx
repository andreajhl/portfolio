import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { PageContainer } from "react-app/src/components/layouts/page-container";
import { ForgotPassword } from "react-app/src/components/pages/forgot-password";
import { defineMessages } from "react-intl";
const headData = defineMessages({
  titleTrending: { defaultMessage: "Famosos.com - Recuperar contraseña" },
  descriptionTrending: { defaultMessage: "Famosos.com - Recuperar contraseña" }
});

const ForgotPasswordPage = () => {
  return (
    <>
      <CustomHead
        title={headData.titleTrending}
        description={headData.descriptionTrending}
      />
      <ForgotPassword />
    </>
  );
};

export default ForgotPasswordPage;
