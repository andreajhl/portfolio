import { shallow } from "enzyme";
import { AuthTermsAdvertise } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<AuthTermsAdvertise />);
  expect(wrapper.exists()).toBeTruthy();
});
