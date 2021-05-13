import { shallow } from "enzyme";
import { CustomizeGiftCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CustomizeGiftCard deliveryTo="Ana" />);
  expect(wrapper.exists()).toBeTruthy();
});
