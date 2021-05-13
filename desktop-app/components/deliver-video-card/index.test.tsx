import { shallow } from "enzyme";
import { DeliverVideoCard } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<DeliverVideoCard deliveryTo="Ana" />);
  expect(wrapper.exists()).toBeTruthy();
});
