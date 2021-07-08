import { shallow } from "enzyme";
import { AdditionalResultsSection } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<AdditionalResultsSection />);
  expect(wrapper.exists()).toBeTruthy();
});
