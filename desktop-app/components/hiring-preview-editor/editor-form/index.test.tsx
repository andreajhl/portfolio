import { shallow } from "enzyme";
import { EditorForm } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<EditorForm />);
  expect(wrapper.exists()).toBeTruthy();
});
