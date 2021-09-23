import { shallow } from "enzyme";
import { StarPrice } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<StarPrice />);
  expect(wrapper.exists()).toBeTruthy();
});
