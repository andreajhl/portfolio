import { shallow } from "enzyme";
import { VideoDetailsForm } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<VideoDetailsForm />);
  expect(wrapper.exists()).toBeTruthy();
});