import { shallow } from "enzyme";
import ContractNotificationsForm from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<ContractNotificationsForm />);
  expect(wrapper.exists()).toBeTruthy();
});
