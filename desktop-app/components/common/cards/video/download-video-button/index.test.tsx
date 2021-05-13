import { shallow } from "enzyme";
import DownloadVideoButton from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<DownloadVideoButton videoURL="" />);
  expect(wrapper.exists()).toBeTruthy();
});
