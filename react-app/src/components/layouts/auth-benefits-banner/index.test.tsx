import { shallow } from "enzyme";
import { AuthBenefitsBanner } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<AuthBenefitsBanner />);
  expect(wrapper.exists()).toBeTruthy();
});