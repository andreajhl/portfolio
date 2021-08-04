import { shallow } from "enzyme";
import { ShareGiftDropdown } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ShareGiftDropdown />);
  expect(wrapper.exists()).toBeTruthy();
});
