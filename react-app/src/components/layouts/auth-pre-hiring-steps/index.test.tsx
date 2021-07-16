import { shallow } from "enzyme";
import { AuthPreHiringSteps } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<AuthPreHiringSteps />);
  expect(wrapper.exists()).toBeTruthy();
});