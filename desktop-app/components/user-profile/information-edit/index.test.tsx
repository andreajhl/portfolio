import { shallow } from "enzyme";
import UserInformationEdit from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<UserInformationEdit />);
  expect(wrapper.exists()).toBeTruthy();
});
