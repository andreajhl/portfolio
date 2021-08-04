import { shallow } from "enzyme";
import { HeroSectionVideo } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<HeroSectionVideo />);
  expect(wrapper.exists()).toBeTruthy();
});