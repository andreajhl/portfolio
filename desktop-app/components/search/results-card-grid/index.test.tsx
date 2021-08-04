import { shallow } from "enzyme";
import { ResultsCardGrid } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ResultsCardGrid />);
  expect(wrapper.exists()).toBeTruthy();
});
