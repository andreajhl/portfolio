import { shallow } from "enzyme";
import { HelpCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<HelpCard deliveryTo="Ana" />);
  expect(wrapper.exists()).toBeTruthy();
});
