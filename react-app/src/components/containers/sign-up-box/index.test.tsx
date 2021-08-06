import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { SignUpBox } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <SignUpBox />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
