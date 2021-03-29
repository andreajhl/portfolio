import { shallow } from "enzyme";
import SubmitButton from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<SubmitButton />);
  expect(wrapper.exists()).toBeTruthy();
});
