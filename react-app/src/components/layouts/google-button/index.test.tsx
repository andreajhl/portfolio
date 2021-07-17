import { shallow } from "enzyme";
import { GoogleButton } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<GoogleButton />);
  expect(wrapper.exists()).toBeTruthy();
});
