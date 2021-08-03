import { shallow } from "enzyme";
import { ValidateEmailModal } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<ValidateEmailModal />);
  expect(wrapper.exists()).toBeTruthy();
});