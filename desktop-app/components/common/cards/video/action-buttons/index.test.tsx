import { shallow } from "enzyme";
import VideoActionButtons from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<VideoActionButtons />);
  expect(wrapper.exists()).toBeTruthy();
});
