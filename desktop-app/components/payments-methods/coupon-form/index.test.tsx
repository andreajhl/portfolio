import { shallow } from "enzyme";
import { CouponForm } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<CouponForm contractReference="123-123-123" />);
  expect(wrapper.exists()).toBeTruthy();
});
