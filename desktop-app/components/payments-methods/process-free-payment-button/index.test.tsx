import { shallow } from "enzyme";
import { ProcessFreePaymentButton } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<ProcessFreePaymentButton />);
  expect(wrapper.exists()).toBeTruthy();
});
