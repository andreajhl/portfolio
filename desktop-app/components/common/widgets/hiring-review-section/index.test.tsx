import { shallow } from "enzyme";
import { HiringReviewSection } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<HiringReviewSection />);
  expect(wrapper.exists()).toBeTruthy();
});
