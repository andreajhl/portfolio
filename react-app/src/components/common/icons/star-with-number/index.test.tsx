import { shallow } from "enzyme";
import { StarWithNumber } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<StarWithNumber />);
  expect(wrapper.exists()).toBeTruthy();
});
