import { shallow } from "enzyme";
import { ClientHiringForOther } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ClientHiringForOther />);
  expect(wrapper.exists()).toBeTruthy();
});
