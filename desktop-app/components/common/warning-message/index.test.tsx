import { shallow } from "enzyme";
import WarningMessage from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<WarningMessage message="Lorem" />);
  expect(wrapper.exists()).toBeTruthy();
});
