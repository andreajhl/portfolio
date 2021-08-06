import { shallow } from "enzyme";
import { IconButton } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<IconButton />);
  expect(wrapper.exists()).toBeTruthy();
});
