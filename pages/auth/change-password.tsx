import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { UpdatePassword } from "react-app/src/components/pages/update-password";
import { defineMessages } from "react-intl";

const headData = defineMessages({
  titleTrending: { defaultMessage: "Famosos.com - Recuperar contraseña" },
  descriptionTrending: { defaultMessage: "Famosos.com - Recuperar contraseña" }
});

const UpdatePasswordPage = () => {
  return (
    <>
      <CustomHead
        title={headData.titleTrending}
        description={headData.descriptionTrending}
      />
      <UpdatePassword />
    </>
  );
};

export default UpdatePasswordPage;
