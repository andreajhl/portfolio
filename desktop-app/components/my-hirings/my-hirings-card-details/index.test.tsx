import { shallow } from "enzyme";
import { MyHiringsCardDetails } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardDetails />);
  expect(wrapper.exists()).toBeTruthy();
});