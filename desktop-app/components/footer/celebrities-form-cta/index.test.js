import React from "react";
import { shallow } from "enzyme";
import CelebritiesFormCTA from "./index";

const wrapper = shallow(<CelebritiesFormCTA />);

describe("<CelebritiesFormCTA/>", () => {
  it("should render without crash", () => {
    expect(wrapper.length).toEqual(1);
  });
});
