import { shallow } from "enzyme";
import { ActiveBenefitsCounter } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ActiveBenefitsCounter />);
  expect(wrapper.exists()).toBeTruthy();
});
