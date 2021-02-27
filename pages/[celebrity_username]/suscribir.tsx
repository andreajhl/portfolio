import { GetServerSideProps } from "next";
import { wrapper } from "react-app/src/state/store";
import { get } from "react-app/src/state/ducks/celebrities/actions";
import { CELEBRITY_PROFILE_ERROR } from "react-app/src/routing/Paths";
import CustomHead from "react-app/src/components/common/helpers/custom-head";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingPage from "react-app/src/components/layouts/loading-page";
import { SubscribePage } from "react-app/src/components/pages/subscribir";
import {
  GET_CELEBRITY_REQUEST_COMPLETED,
  GET_CELEBRITY_REQUEST_SUCCESS
} from "react-app/src/state/ducks/celebrities/types";
import { getPostsFromCelebrity } from "react-app/src/firebase/firestoreService";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async ({ params: { celebrity_username }, store }) => {
    const celebrity = {
      id: 864,
      fullName: "Mark Tacher Testing",
      username: "marktacher",
      avatar: "https://via.placeholder.com/600/e0c586",
      hashtags: ["Actor", "TvHost", "CDMX"],
      description: "Actor, Host, Music, Producer.",
      mainVideo:
        "https://dqb0851cl2gjs.cloudfront.net/main-videos/864/famosos-videos-personalizados-marktacher-crf-video480.mp4",
      isDonor: true,
      causeUrl: "",
      causeLogo: "",
      causeName: "Minuto De Dios",
      categoryId: 4,
      categoryTitle: "Actores",
      countryId: 25,
      countryCode: "MEX",
      countryName: "Mexico",
      turnaround: 0,
      showSimilarCelebrities: true,
      availableForFlashDeliveries: true,
      availableForSubscriptions: true,
      contractTypes: [
        {
          contractType: 1,
          name: "VideoMessage",
          description: "",
          price: 25,
          allowInFFB: false,
          options: {}
        },
        {
          contractType: 3,
          name: "VideoMessageSpecial2",
          description: "",
          price: 0,
          allowInFFB: false,
          options: {}
        },
        {
          contractType: 2,
          name: "VideoMessageSpecial1",
          description: "",
          price: 0,
          allowInFFB: false,
          options: { url: "", buttonLabel: "Contratar Evento Privado" }
        },
        {
          contractType: 4,
          name: "VideoMessageSpecial3",
          description: "",
          price: 0,
          allowInFFB: false,
          options: {}
        },
        {
          contractType: 5,
          name: "1 Story",
          description: "",
          price: 0,
          allowInFFB: true,
          options: {}
        },
        {
          contractType: 6,
          name: "1 Post Video",
          description: "",
          price: 0,
          allowInFFB: true,
          options: {}
        },
        {
          contractType: 7,
          name: "1 Post Image",
          description: "",
          price: 0,
          allowInFFB: true,
          options: {}
        },
        {
          contractType: 8,
          name: "1 Post Carousel",
          description: "",
          price: 0,
          allowInFFB: true,
          options: {}
        }
      ]
    };

    store.dispatch({
      type: GET_CELEBRITY_REQUEST_SUCCESS,
      payload: { data: { data: { celebrity } } }
    });
    store.dispatch({
      type: GET_CELEBRITY_REQUEST_COMPLETED,
      payload: { data: { data: { celebrity } } }
    });
    // await get(celebrity_username, true)(store.dispatch);

    // const celebrity = store.getState().celebrities.getCelebrityReducer.data;
    // if (!celebrity.id) {
    //   return {
    //     redirect: {
    //       destination: CELEBRITY_PROFILE_ERROR.replace(
    //         ":celebrity_username",
    //         String(celebrity_username)
    //       ),
    //       permanent: false
    //     }
    //   };
    // }

    const isTypeImage = ({ type }) => type === "image";

    const results = await getPostsFromCelebrity("dev_posts", celebrity.id, 10);
    const posts = results
      .filter(({ urls }) => urls.some(isTypeImage))
      .map(({ urls, ...posts }) => ({
        ...posts,
        urls: urls.filter(isTypeImage).slice(0, 1)
      }));

    console.log(posts);

    return {
      props: {
        celebrity,
        posts
      }
    };
  }
);

const Subscribe = ({ celebrity, posts }) => {
  return (
    <>
      <CustomHead
        title={`Famosos.com - Subscribirse a ${celebrity.fullName}`}
        description={`Subscribirse a ${celebrity.fullName} en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas.`}
        ogImage={celebrity.avatar}
        ogVideo={celebrity.mainVideo}
      />
      <SubscribePage posts={posts} />
    </>
  );
};

export default Subscribe; /* withAuthenticationRequired(Subscribe, {
  onRedirecting: LoadingPage
}); */
