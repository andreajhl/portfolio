import { shallow } from "enzyme";
import { FlashDeliveryBadgeLayout } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<FlashDeliveryBadgeLayout />);
  expect(wrapper.exists()).toBeTruthy();
});
