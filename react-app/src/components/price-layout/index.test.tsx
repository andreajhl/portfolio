import React from "react";
import { mount } from "enzyme";
import PriceLayout, { PriceLayoutProps } from "./";

describe("<PriceLayout />", () => {
  let props: PriceLayoutProps;
  let wrapper;

  describe("should render correctly", () => {
    beforeEach(() => {
      props = {
        showPrefix: false,
        price: 10,
        currencyData: { to: "USD" }
      };
      wrapper = mount(<PriceLayout {...props} />);
    });

    it("render without prefix", () => {
      expect(wrapper.text()).toBe("10.00 USD");
    });
  });
});
