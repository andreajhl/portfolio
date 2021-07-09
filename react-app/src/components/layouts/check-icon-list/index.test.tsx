import { shallow } from "enzyme";
import { CheckIconList } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<CheckIconList items={[]} />);
  expect(wrapper.exists()).toBeTruthy();
});
