import { shallow } from "enzyme";
import { MyHiringsCardBodyRightSide } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardBodyRightSide />);
  expect(wrapper.exists()).toBeTruthy();
});