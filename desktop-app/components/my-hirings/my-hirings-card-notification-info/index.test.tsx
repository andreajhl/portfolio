import { shallow } from "enzyme";
import { MyHiringsCardDeliveryInfo } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardDeliveryInfo />);
  expect(wrapper.exists()).toBeTruthy();
});