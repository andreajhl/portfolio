import { shallow } from "enzyme";
import { TypingEffectLooped } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<TypingEffectLooped words={["test"]} />);
  expect(wrapper.exists()).toBeTruthy();
});
