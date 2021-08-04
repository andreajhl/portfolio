import { shallow } from "enzyme";
import testUser from "__test__/fake-data/testUser";
import UserInformationEdit from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<UserInformationEdit userData={testUser} />);
  expect(wrapper.exists()).toBeTruthy();
});
