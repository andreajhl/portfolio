import { shallow } from "enzyme";
import { CountryFlag } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CountryFlag countryId={156} alpha2Code="CO" />);
  expect(wrapper.find("img")).toHaveLength(1);
});
