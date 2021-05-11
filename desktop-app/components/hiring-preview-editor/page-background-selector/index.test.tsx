import { shallow } from "enzyme";
import { PageBackgroundSelector } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<PageBackgroundSelector />);
  expect(wrapper.exists()).toBeTruthy();
});
