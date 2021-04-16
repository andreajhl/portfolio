import { shallow } from "enzyme";
import { CountryFilter } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CountryFilter />);
  expect(wrapper.exists()).toBeTruthy();
});
