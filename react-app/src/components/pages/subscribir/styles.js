import styled from "styled-components";
import { Card } from "../../common/cards";

export const Hero = styled.header`
  height: 219px;

  @media only screen and (min-width: 768px) {
    height: 340px;

    figure {
      border-radius: 10px;
      overflow: hidden;
    }
  }

  div {
    height: 100%;
  }
  figure {
    width: 100%;
    height: 100%;
    img {
      object-fit: cover;
      height: 100%;
    }
  }
`;

export const CelebrityInfoSection = styled.section`
  margin-top: -4rem;
  margin-bottom: 2.3125rem;
  text-align: center;

  figure {
    margin-bottom: 19px !important;
    img {
      border: 4px solid black;
    }
  }
`;
export const CelebrityInfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  line-height: 29px;
  margin-bottom: 6px;
`;
export const CelebrityInfoSubtitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
`;
export const PlanInfoSection = styled(Card)`
  text-align: center;
  /* height: 237px; */
  max-width: 570px;
  margin: 0 auto;
`;

export const PlanInfoStar = styled.img.attrs({
  src: "/assets/img/subscription-star.svg"
})`
  margin-top: -52px;
  width: 50px;
  height: 50px;
`;
export const PlanInfoDescription = styled.p`
  font-size: 14px;
  line-height: 17px;
  max-width: 360px;
  margin: 1rem auto;
`;
export const PlanInfoPrice = styled.p`
  font-size: 22px;
  font-weight: bold;
  line-height: 26px;
  margin-bottom: 0;
`;

export const LastsPostsTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  line-height: 22px;
  margin-bottom: 0;
  text-align: center;
`;
