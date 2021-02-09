import { GetServerSideProps } from "next";
import { wrapper } from "react-app/state/store";
import { get } from "react-app/state/ducks/celebrities/actions";
import { CelebrityProfileLayoutC } from "react-app/components/layouts/celebrity-profile-c";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params, store }) => {
    await get(params.celebrity_username, true)(store.dispatch);

    return {
      props: {
        celebrity: store.getState().celebrities.getCelebrityReducer.data
      }
    };
  }
);

const CelebrityProfile = ({ celebrity }) => {
  return <CelebrityProfileLayoutC celebrity={celebrity} />;
};

export default CelebrityProfile;
