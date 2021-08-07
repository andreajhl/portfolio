import { shallow } from "enzyme";
import { NoResultsBanner } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<NoResultsBanner />);
  expect(wrapper.exists()).toBeTruthy();
});
