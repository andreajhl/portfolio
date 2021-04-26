import { shallow } from "enzyme";
import { MyHiringsCardBodyLeftSide } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardBodyLeftSide />);
  expect(wrapper.exists()).toBeTruthy();
});