import { shallow } from "enzyme";
import { InputField } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<InputField />);
  expect(wrapper.exists()).toBeTruthy();
});