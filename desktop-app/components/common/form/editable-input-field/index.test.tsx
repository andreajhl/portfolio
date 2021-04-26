import { shallow } from "enzyme";
import { EditableInputField } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<EditableInputField />);
  expect(wrapper.exists()).toBeTruthy();
});
