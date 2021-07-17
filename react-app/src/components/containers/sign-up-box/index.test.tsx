import { shallow } from "enzyme";
import { SignUpBox } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<SignUpBox />);
  expect(wrapper.exists()).toBeTruthy();
});
