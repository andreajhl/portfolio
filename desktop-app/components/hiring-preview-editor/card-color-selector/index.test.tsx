import { shallow } from "enzyme";
import { CardColorSelector } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CardColorSelector />);
  expect(wrapper.exists()).toBeTruthy();
});
