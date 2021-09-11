import { shallow } from "enzyme";
import { StickyBar } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<StickyBar appearancePosition={0}>Prueba</StickyBar>);
  expect(wrapper.exists()).toBeTruthy();
});
