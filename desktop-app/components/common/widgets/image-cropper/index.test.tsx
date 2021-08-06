import { shallow } from "enzyme";
import { ImageCropper } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ImageCropper />);
  expect(wrapper.exists()).toBeTruthy();
});
