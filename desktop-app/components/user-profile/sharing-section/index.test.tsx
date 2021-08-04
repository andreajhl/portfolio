import { shallow } from "enzyme";
import { SharingSection } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SharingSection />);
  expect(wrapper.exists()).toBeTruthy();
});