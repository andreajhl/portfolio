import { shallow } from "enzyme";
import { CardGenerationReminder } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CardGenerationReminder />);
  expect(wrapper.exists()).toBeTruthy();
});
