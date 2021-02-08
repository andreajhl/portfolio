import React from "react";

const Home = () => {
  return (
    <>
      <div>
        Hola <span>Mundo</span>
      </div>
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
