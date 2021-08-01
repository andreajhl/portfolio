import { shallow } from "enzyme";
import { SignUpWithEmailWizard } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<SignUpWithEmailWizard willRedirect={false} />);
  expect(wrapper.exists()).toBeTruthy();
});
