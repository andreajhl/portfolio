import { shallow } from "enzyme";
import { UserStarsLink } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<UserStarsLink />);
  expect(wrapper.exists()).toBeTruthy();
});
