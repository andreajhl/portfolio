import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { FourZeroFourCelebrityProfile as FourZeroFourCelebrityProfileLayout } from "react-app/src/components/pages/404CelebrityProfile";

const FourZeroFourCelebrityProfile = (props) => {
  const {
    query: { celebrity_username }
  } = useRouter();

  return (
    <>
      <CustomHead
        title="Famoso no encontrado"
        description="No se encontró un famoso con este usuario"
      />
      <FourZeroFourCelebrityProfileLayout
        celebrityUsername={celebrity_username}
      />
    </>
  );
};

export default FourZeroFourCelebrityProfile;
