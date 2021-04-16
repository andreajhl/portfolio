import { shallow } from "enzyme";
import { MainContentTopBar } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MainContentTopBar />);
  expect(wrapper.exists()).toBeTruthy();
});