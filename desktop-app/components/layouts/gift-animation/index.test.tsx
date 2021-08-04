import { shallow } from "enzyme";
import { GiftAnimation } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<GiftAnimation />);
  expect(wrapper.exists()).toBeTruthy();
});
