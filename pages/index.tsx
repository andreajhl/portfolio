import React from "react";
import { CelebrityCardLayout } from "react-app/src/components/layouts/celebrity-card";

const Home = () => {
  return (
    <>
      <div>
        Hola <span>Mundo</span>
      </div>
      <CelebrityCardLayout
        celebrity={{
          id: 1107,
          fullName: "Andrés Cepeda Testing",
          username: "andrescepeda",
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/famosos-27f08.appspot.com/o/images%2Ffamosos-avatar-celebrity-730846e3-f114-4dde-a144-1f4467fdb87c.jpg?alt=media&token=bf0271e0-13ba-4148-aa90-dc763a7e341b",
          title: "Músicos",
          videoMessagePrice: 125,
          countryCode: "COL",
          availableForFlashDeliveries: true
        }}
      />
      <style jsx>
        {`
          div {
            color: red;

            span {
              color: blue;
            }
          }
        `}
      </style>
    </>
  );
};

export default Home;
