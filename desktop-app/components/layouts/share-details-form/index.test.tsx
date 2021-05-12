import { shallow } from "enzyme";
import { ShareDetailsForm } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ShareDetailsForm />);
  expect(wrapper.exists()).toBeTruthy();
});
