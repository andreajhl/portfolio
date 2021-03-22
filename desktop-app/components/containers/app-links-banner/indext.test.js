import React from "react";
import { shallow } from "enzyme";
import AppLinksBanner from "./index";

const wrapper = shallow(<AppLinksBanner />);

describe("<AppLinksBanner/>", () => {
  it("should render without crash", () => {
    expect(wrapper.length).toEqual(1);
  });
});
