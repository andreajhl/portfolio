import { shallow } from "enzyme";
import { ShareVideoButton } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ShareVideoButton link="" />);
  expect(wrapper.exists()).toBeTruthy();
});
