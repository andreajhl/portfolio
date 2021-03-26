import { shallow } from "enzyme";
import { StickyTopBar } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <StickyTopBar appearancePosition={0}>Prueba</StickyTopBar>
  );
  expect(wrapper.exists()).toBeTruthy();
});
