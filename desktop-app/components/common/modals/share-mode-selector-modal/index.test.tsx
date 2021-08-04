import { shallow } from "enzyme";
import { ShareModeSelectorModal } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ShareModeSelectorModal />);
  expect(wrapper.exists()).toBeTruthy();
});
