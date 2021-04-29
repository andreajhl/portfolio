import { shallow } from "enzyme";
import UserInformationConfig from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<UserInformationConfig />);
  expect(wrapper.exists()).toBeTruthy();
});
