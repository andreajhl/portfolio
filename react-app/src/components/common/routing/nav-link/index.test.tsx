import React from "react";
import { mount } from "enzyme";
import { NavLink } from ".";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

let wrapper;
let anchorElement;
const linkText = "Link text";
const linkTo = "/#test=true";
const linkActiveClassName = "active";

beforeEach(() => {
  useRouter.mockImplementationOnce(() => ({
    asPath: linkTo,
  }));
  wrapper = mount(
    <NavLink to={linkTo} activeClassName={linkActiveClassName}>
      {linkText}
    </NavLink>
  );
  anchorElement = wrapper.find("a");
});

it("Renders a 'a' tag", () => {
  expect(anchorElement.text()).toBe(linkText);
  expect(anchorElement.prop("href")).toBe(linkTo);
});

it("adds activeClassName class to the 'a' tag when is in the path", () => {
  expect(anchorElement.hasClass(linkActiveClassName));
});

it("not adds activeClassName class to the 'a' tag when is not in the path", () => {
  const newLinkTo = "/testing";
  useRouter.mockImplementation(() => ({
    asPath: newLinkTo,
  }));

  const anotherLink = "/papaya";

  const newWrapper = mount(
    <NavLink to={anotherLink} activeClassName={linkActiveClassName}>
      {linkText}
    </NavLink>
  );
  const newAnchorElement = newWrapper.find("a");
  expect(newAnchorElement.hasClass(linkActiveClassName)).not.toBeTruthy();
});
