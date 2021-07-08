import { shallow } from "enzyme";
import { SignInBox } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<SignInBox />);
  expect(wrapper.exists()).toBeTruthy();
});
