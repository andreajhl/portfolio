import { shallow } from "enzyme";
import PhotoUploader from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<PhotoUploader />);
  expect(wrapper.exists()).toBeTruthy();
});
