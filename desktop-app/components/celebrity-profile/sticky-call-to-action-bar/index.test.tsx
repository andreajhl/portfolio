import { shallow } from "enzyme";
import testCelebrity from "__test__/fake-data/testCelebrity";
import { StickyCallToActionBar } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <StickyCallToActionBar appearancePosition={0} celebrity={testCelebrity} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
