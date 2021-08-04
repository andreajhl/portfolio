import { shallow } from "enzyme";
import { SearchPage } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<SearchPage />);
  expect(wrapper.exists()).toBeTruthy();
});