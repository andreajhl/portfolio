import { shallow } from "enzyme";
import { SignInEmailPasswordForm } from "./";
import React from "react";

it("should renders without crashing", () => {
  const wrapper = shallow(<SignInEmailPasswordForm email={""} />);
  expect(wrapper.exists()).toBeTruthy();
});
