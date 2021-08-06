import { shallow } from "enzyme";
import { WhatHappensBeforeBanner } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<WhatHappensBeforeBanner />);
  expect(wrapper.exists()).toBeTruthy();
});
