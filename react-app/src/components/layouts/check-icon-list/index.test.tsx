import { shallow } from "enzyme";
import { CheckIconList } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<CheckIconList />);
  expect(wrapper.exists()).toBeTruthy();
});
