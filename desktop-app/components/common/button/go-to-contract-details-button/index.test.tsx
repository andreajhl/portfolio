import { shallow } from "enzyme";
import { GoToContractDetailsButton } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<GoToContractDetailsButton />);
  expect(wrapper.exists()).toBeTruthy();
});
