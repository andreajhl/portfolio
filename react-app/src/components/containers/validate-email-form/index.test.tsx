import { shallow } from "enzyme";
import { ValidateEmailForm } from ".";
import React from "react";

it("should renders without crashing", () => {
  const wrapper = shallow(<ValidateEmailForm email={""} />);
  expect(wrapper.exists()).toBeTruthy();
});
