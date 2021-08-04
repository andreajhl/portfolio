import { shallow } from "enzyme";
import LogoutButtonHOC from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<LogoutButtonHOC children={<></>} />);
  expect(wrapper.exists()).toBeTruthy();
});
