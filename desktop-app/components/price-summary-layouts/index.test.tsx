import { shallow } from "enzyme";
import { TotalPrice } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<TotalPrice />);
  expect(wrapper.exists()).toBeTruthy();
});
