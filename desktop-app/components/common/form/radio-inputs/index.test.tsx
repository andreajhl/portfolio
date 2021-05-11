import { shallow } from "enzyme";
import { RadioInputs } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<RadioInputs />);
  expect(wrapper.exists()).toBeTruthy();
});
