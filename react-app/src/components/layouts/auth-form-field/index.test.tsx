import { shallow } from "enzyme";
import { AuthFormField } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<AuthFormField />);
  expect(wrapper.exists()).toBeTruthy();
});