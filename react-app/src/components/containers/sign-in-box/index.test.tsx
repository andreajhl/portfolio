import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { SignInBox } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <SignInBox />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
