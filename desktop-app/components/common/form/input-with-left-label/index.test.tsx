import { shallow } from "enzyme";
import { InputWithLeftLabel } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<InputWithLeftLabel />);
  expect(wrapper.exists()).toBeTruthy();
});