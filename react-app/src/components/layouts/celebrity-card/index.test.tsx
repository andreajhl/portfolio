/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import CelebrityCardLayout from ".";
import { NavLink } from "react-app/src/components/common/routing";
import { shallow } from "enzyme";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { FlashDeliveryBadgeLayout } from "../flash-delivery-badge";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { ContractPriceLayout } from "../celebrity-card-contract-price";
import { celebrityType } from "../../../types/celebrityType";
import LazyLoadingImage from "../../common/lazy-loading-image";

const testingCelebrity: celebrityType = {
  id: 1107,
  fullName: "Andrés Cepeda Testing",
  username: "andrescepeda",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/famosos-27f08.appspot.com/o/images%2Ffamosos-avatar-celebrity-730846e3-f114-4dde-a144-1f4467fdb87c.jpg?alt=media&token=bf0271e0-13ba-4148-aa90-dc763a7e341b",
  title: "Músicos",
  videoMessagePrice: 125,
  countryCode: "COL",
  availableForFlashDeliveries: true,
  availableForSubscriptions: true,
  status: 50,
};

const testingInitialCurrencyExchangeData = { to: "USD", rate: 1 };

let wrapper;

describe("'CelebrityCardLayout' renders properly", () => {
  beforeEach(() => {
    wrapper = shallow(
      <CelebrityCardLayout
        celebrityCardLayout={{}}
        celebrity={testingCelebrity}
        currencyExchangeData={testingInitialCurrencyExchangeData}
      />
    );
  });

  it("should render a NavLink as parent", () => {
    expect(wrapper.type()).toBe(NavLink);
  });

  it("should render <LazyLoadingImage /> as avatar", () => {
    expect(
      wrapper.containsMatchingElement(
        <LazyLoadingImage
          objectFit="cover"
          src={`${testingCelebrity.avatar}?${testingCelebrity.title}-${testingCelebrity.countryCode}`}
          placeholderSrc="/assets/img/avatar-blank.png"
        />
      )
    ).toBeTruthy();
  });

  it("should render the celebrity price", () => {
    expect(
      wrapper.containsMatchingElement(
        <ContractPriceLayout
          price={testingCelebrity.videoMessagePrice}
          currency={testingInitialCurrencyExchangeData.to}
          rounding
        />
      )
    ).toBeTruthy();
  });

  it("should render the celebrity category", () => {
    expect(
      wrapper.containsMatchingElement(<span>{testingCelebrity.title}</span>)
    ).toBeTruthy();
  });

  it("should render the celebrity full name", () => {
    expect(
      wrapper.containsMatchingElement(<h3>{testingCelebrity.fullName}</h3>)
    ).toBeTruthy();
  });

  it("should render the celebrity country flag", () => {
    expect(
      wrapper.containsMatchingElement(
        <CountryFlag countryCode={testingCelebrity.countryCode} />
      )
    ).toBeTruthy();
  });

  it("should render the celebrity like icon", () => {
    expect(
      wrapper.containsMatchingElement(
        <CelebrityFavoriteButton celebrityId={testingCelebrity.id} />
      )
    ).toBeTruthy();
  });

  it("should render the flash delivery badge in the compacted version", () => {
    const foundFlashDeliveryBadge = wrapper.find(FlashDeliveryBadgeLayout);
    expect(foundFlashDeliveryBadge.props()).toMatchObject({
      color: "white",
      showTime: false,
      showTitle: false,
    });
  });
});
