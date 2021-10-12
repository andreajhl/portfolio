import { shallow } from "enzyme";
import { ErrorMessagePage } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ErrorMessagePage />);
  expect(wrapper.exists()).toBeTruthy();
});
