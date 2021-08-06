import { shallow } from "enzyme";
import { SubmitText } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<SubmitText />);
  expect(wrapper.exists()).toBeTruthy();
});
