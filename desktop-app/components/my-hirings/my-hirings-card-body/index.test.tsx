import { shallow } from "enzyme";
import { MyHiringsCardBody } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardBody />);
  expect(wrapper.exists()).toBeTruthy();
});