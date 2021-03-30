import { shallow } from "enzyme";
import { WizardTopNavigation } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<WizardTopNavigation />);
  expect(wrapper.exists()).toBeTruthy();
});