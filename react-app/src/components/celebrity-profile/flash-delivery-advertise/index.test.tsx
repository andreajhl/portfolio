import { shallow } from "enzyme";
import { FlashDeliveryAdvertise } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<FlashDeliveryAdvertise />);
  expect(wrapper.exists()).toBeTruthy();
});
