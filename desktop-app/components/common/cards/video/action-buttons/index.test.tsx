import { shallow } from "enzyme";
import VideoActionButtons from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<VideoActionButtons videoURL="" />);
  expect(wrapper.exists()).toBeTruthy();
});
