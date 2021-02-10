import React from "react";
import { mount } from "enzyme";
import NavLink from ".";
import { createRouter } from "next/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";

let wrapper;
let anchorElement;
const linkText = "Link text";
const linkTo = "/#test=true";
const linkActiveClassName = "active";

const router = createRouter(linkTo, {}, "", {
  subscription: jest.fn(),
  initialProps: {},
  pageLoader: jest.fn(),
  App: jest.fn(),
  wrapApp: jest.fn(),
  Component: jest.fn(),
  isFallback: false
});

beforeEach(() => {
  wrapper = mount(
    <RouterContext.Provider value={router}>
      <NavLink to={linkTo} activeClassName={linkActiveClassName}>
        {linkText}
      </NavLink>
    </RouterContext.Provider>
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
  const newRouter = createRouter(newLinkTo, {}, "", {
    subscription: jest.fn(),
    initialProps: {},
    pageLoader: jest.fn(),
    App: jest.fn(),
    wrapApp: jest.fn(),
    Component: jest.fn(),
    isFallback: false
  });

  const newWrapper = mount(
    <RouterContext.Provider value={newRouter}>
      <NavLink to={linkTo} activeClassName={linkActiveClassName}>
        {linkText}
      </NavLink>
    </RouterContext.Provider>
  );
  const newAnchorElement = newWrapper.find("a");
  expect(newAnchorElement.hasClass(linkActiveClassName)).not.toBeTruthy();
});
