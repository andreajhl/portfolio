import { shallow } from "enzyme";
import { FacebookButton } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<FacebookButton />);
  expect(wrapper.exists()).toBeTruthy();
});
