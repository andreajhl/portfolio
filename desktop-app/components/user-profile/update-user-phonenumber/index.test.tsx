import { shallow } from "enzyme";
import UpdateUserPhone from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<UpdateUserPhone numberPhone="1234" />);
  expect(wrapper.exists()).toBeTruthy();
});
