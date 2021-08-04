import { shallow } from "enzyme";
import { FamososLogo } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<FamososLogo />);
  expect(wrapper.exists()).toBeTruthy();
});
