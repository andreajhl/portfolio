import { shallow } from "enzyme";
import testCelebrity from "__test__/testCelebrity";
import { StickyCallToActionTopBar } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(
    <StickyCallToActionTopBar
      appearancePosition={0}
      celebrity={testCelebrity}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
