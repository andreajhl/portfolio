import { shallow } from "enzyme";
import { ShareVideoButton } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ShareVideoButton contractReference="" />);
  expect(wrapper.exists()).toBeTruthy();
});
