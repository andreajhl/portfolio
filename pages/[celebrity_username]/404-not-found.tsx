import { GetServerSideProps } from "next";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { FourZeroFourCelebrityProfile as FourZeroFourCelebrityProfileLayout } from "react-app/src/components/pages/404CelebrityProfile";
import { CELEBRITY_PROFILE } from "react-app/src/routing/Paths";
import { get } from "react-app/src/state/ducks/celebrities/actions";
import { wrapper } from "react-app/src/state/store";
import { defineMessages, useIntl } from "react-intl";

const headData = defineMessages({
  titleClub: {
    defaultMessage: "Famoso no encontrado",
  },
  descriptionClub: {
    defaultMessage: "No se encontró un famoso con este usuario",
  },
});
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params: { celebrity_username }, store }) => {
    await get(celebrity_username)(store.dispatch);

    const celebrity = store.getState().celebrities.getCelebrityReducer.data;
    if (celebrity.id) {
      return {
        redirect: {
          destination: CELEBRITY_PROFILE.replace(
            ":celebrity_username",
            String(celebrity_username)
          ),
          permanent: false,
        },
      };
    }

    return {
      props: {
        celebrity_username,
      },
    };
  }
);

const FourZeroFourCelebrityProfile = ({ celebrity_username }) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <CustomHead
        title={formatMessage(headData.titleClub)}
        description={formatMessage(headData.descriptionClub)}
      />
      <FourZeroFourCelebrityProfileLayout
        celebrityUsername={celebrity_username}
      />
    </>
  );
};

export default FourZeroFourCelebrityProfile;
