import { shallow } from "enzyme";
import { CountryFilter } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<CountryFilter />);
  expect(wrapper.exists()).toBeTruthy();
});
