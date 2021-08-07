import { shallow } from "enzyme";
import { StepsGrayBanner } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<StepsGrayBanner />);
  expect(wrapper.exists()).toBeTruthy();
});
