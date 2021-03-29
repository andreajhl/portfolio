import { shallow } from "enzyme";
import HeroSection from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<HeroSection />);
  expect(wrapper.exists()).toBeTruthy();
});
