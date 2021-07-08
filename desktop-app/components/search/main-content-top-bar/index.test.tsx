import { shallow } from "enzyme";
import ReduxProvider from "__test__/ReduxProvider";
import { MainContentTopBar } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ReduxProvider>
      <MainContentTopBar />
    </ReduxProvider>
  );
  expect(wrapper.exists()).toBeTruthy();
});
