import { shallow } from "enzyme";
import OptimizedImage from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<OptimizedImage />);
  expect(wrapper.exists()).toBeTruthy();
});
