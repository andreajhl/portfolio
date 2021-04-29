import { shallow } from "enzyme";
import { ApologyBanner } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ApologyBanner />);
  expect(wrapper.exists()).toBeTruthy();
});