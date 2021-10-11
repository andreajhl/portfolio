import { shallow } from "enzyme";
import { OffCanvasSearchFilters } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<OffCanvasSearchFilters />);
  expect(wrapper.exists()).toBeTruthy();
});
