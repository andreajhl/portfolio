/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import CelebrityCardLayout from "./";
import { NavLink } from "react-app/src/components/common/routing";
import { shallow } from "enzyme";
import { CountryFlag } from "../../containers/celebrity-country-flag";
import { FlashDeliveryBadgeLayout } from "../flash-delivery-badge";
import { CelebrityFavoriteButton } from "../celebrity-favorite-button";
import { ContractPriceLayout } from "../celebrity-card-contract-price";

const testingCelebrity = {
  id: 1107,
  fullName: "Andrés Cepeda Testing",
  username: "andrescepeda",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/famosos-27f08.appspot.com/o/images%2Ffamosos-avatar-celebrity-730846e3-f114-4dde-a144-1f4467fdb87c.jpg?alt=media&token=bf0271e0-13ba-4148-aa90-dc763a7e341b",
  hashtags: ["cepeda", "topartist", "mevoy", "embrujo", "voyaextrañarte"],
  title: "Músicos",
  videoMessagePrice: 125,
  countryCode: "COL",
  countryName: "Colombia",
  showSimilarCelebrities: false,
  availableForFlashDeliveries: true,
  availableForSubscriptions: true
};

const testingInitialCurrencyExchangeData = { to: "USD", rate: 1 };

let wrapper;

describe("'CelebrityCardLayout' renders properly", () => {
  beforeEach(() => {
    wrapper = shallow(
      <CelebrityCardLayout
        celebrity={testingCelebrity}
        currencyExchangeData={testingInitialCurrencyExchangeData}
      />
    );
  });

  test("should render a NavLink as parent", () => {
    expect(wrapper.type()).toBe(NavLink);
  });

  test("should render the loading avatar image", () => {
    expect(
      wrapper.containsMatchingElement(
        <img
          src="/assets/img/avatar-blank.png"
          alt="avatar"
          className="celebrity__profile-photo "
        />
      )
    ).toBeTruthy();
  });

  test("should not display the celebrity avatar when is not loaded", () => {
    expect(
      wrapper.find(`img[src='${testingCelebrity.avatar}']`).hasClass("d-none")
    ).toBeTruthy();
  });

  test("should display the celebrity avatar when is loaded", () => {
    wrapper.find(`img[src='${testingCelebrity.avatar}']`).props().onLoad();
    expect(
      wrapper.find(`img[src='${testingCelebrity.avatar}']`).hasClass("d-none")
    ).toBeFalsy();
  });

  test("should render the celebrity price", () => {
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

  test("should render the celebrity category", () => {
    expect(
      wrapper.containsMatchingElement(<span>{testingCelebrity.title}</span>)
    ).toBeTruthy();
  });

  test("should render the celebrity full name", () => {
    expect(
      wrapper.containsMatchingElement(<h3>{testingCelebrity.fullName}</h3>)
    ).toBeTruthy();
  });

  test("should render the celebrity country flag", () => {
    expect(
      wrapper.containsMatchingElement(
        <CountryFlag countryCode={testingCelebrity.countryCode} />
      )
    ).toBeTruthy();
  });

  test("should render the celebrity like icon", () => {
    expect(
      wrapper.containsMatchingElement(
        <CelebrityFavoriteButton celebrityId={testingCelebrity.id} />
      )
    ).toBeTruthy();
  });

  test("should render the flash delivery badge in the compacted version", () => {
    const foundFlashDeliveryBadge = wrapper.find(FlashDeliveryBadgeLayout);
    expect(foundFlashDeliveryBadge.props()).toMatchObject({
      color: "white",
      showTime: false,
      showTitle: false
    });
  });
});
