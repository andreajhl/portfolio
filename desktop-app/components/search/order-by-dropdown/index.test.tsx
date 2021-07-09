import { shallow } from "enzyme";
import { OrderByDropdown } from ".";

const testOptions = [{ label: "test label", value: "test value" }];
it("renders without crashing", () => {
  const wrapper = shallow(<OrderByDropdown options={testOptions} />);
  expect(wrapper.exists()).toBeTruthy();
});
