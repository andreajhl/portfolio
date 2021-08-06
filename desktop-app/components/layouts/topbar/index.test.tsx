import { shallow } from "enzyme";
import { TopBar } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<TopBar />);
  expect(wrapper.exists()).toBeTruthy();
});
