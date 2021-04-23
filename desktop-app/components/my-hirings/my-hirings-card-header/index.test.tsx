import { shallow } from "enzyme";
import { MyHiringsCardHeader } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardHeader />);
  expect(wrapper.exists()).toBeTruthy();
});