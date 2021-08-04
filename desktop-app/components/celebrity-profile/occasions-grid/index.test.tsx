import { shallow } from "enzyme";
import { OccasionsGrid } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<OccasionsGrid />);
  expect(wrapper.exists()).toBeTruthy();
});