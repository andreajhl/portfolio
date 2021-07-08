import { shallow } from "enzyme";
import { PaymentsMethodsSelectorCard } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<PaymentsMethodsSelectorCard />);
  expect(wrapper.exists()).toBeTruthy();
});
