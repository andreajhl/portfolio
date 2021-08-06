import { shallow } from "enzyme";
import { FileUploaderModal } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<FileUploaderModal />);
  expect(wrapper.exists()).toBeTruthy();
});
