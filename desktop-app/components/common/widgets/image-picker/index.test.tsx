import { shallow } from "enzyme";
import { ImagePicker } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ImagePicker />);
  expect(wrapper.exists()).toBeTruthy();
});
