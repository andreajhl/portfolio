import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "./state";
import { MyRoutes } from "./routing/Routes";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

describe("MyRoutes should works properly", () => {
  const wrapper = mount(
    <Provider store={reduxStore}>
      <MyRoutes />
    </Provider>
  );

  it("Should renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Should renders the Home Page", () => {
    const homePageSelector = "div.CelebritiesPage";
    expect(wrapper.exists(homePageSelector)).toBe(true);
  });
});
