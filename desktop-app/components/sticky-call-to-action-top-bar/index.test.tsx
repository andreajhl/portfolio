import { shallow } from "enzyme";
import { StickyCallToActionTopBar } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<StickyCallToActionTopBar />);
  expect(wrapper.exists()).toBeTruthy();
});