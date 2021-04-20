import { shallow } from "enzyme";
import { AdditionalResultsSection } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<AdditionalResultsSection />);
  expect(wrapper.exists()).toBeTruthy();
});