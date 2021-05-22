import { shallow } from "enzyme";
import DLocalFormCard from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<DLocalFormCard />);
  expect(wrapper.exists()).toBeTruthy();
});
