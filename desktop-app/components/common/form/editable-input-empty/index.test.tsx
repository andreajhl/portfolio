import { shallow } from "enzyme";
import { EditableInputEmpty } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<EditableInputEmpty />);
  expect(wrapper.exists()).toBeTruthy();
});
