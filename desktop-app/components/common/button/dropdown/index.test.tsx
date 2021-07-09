import { shallow } from "enzyme";
import { Dropdown } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<Dropdown buttonChildren={null} />);
  expect(wrapper.exists()).toBeTruthy();
});
