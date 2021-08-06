import React from "react";
import { shallow } from "enzyme";
import AppLinksBanner from "./index";

const wrapper = shallow(<AppLinksBanner />);

describe("<AppLinksBanner/>", () => {
  it("should render without crash", () => {
    expect(wrapper.length).toEqual(1);
  });

  describe("<a> tags should be correctly render", () => {
    const linksElements = wrapper.find("a");
    it("should contain 3 <a> tags", () => {
      expect(linksElements.length).toEqual(3);
    });
  });
});
