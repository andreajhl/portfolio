import { shallow } from "enzyme";
import { SignUpEmailPasswordForm } from "./";
import React from "react";

it("should renders without crashing", () => {
  const wrapper = shallow(<SignUpEmailPasswordForm email={""} />);
  expect(wrapper.exists()).toBeTruthy();
});
