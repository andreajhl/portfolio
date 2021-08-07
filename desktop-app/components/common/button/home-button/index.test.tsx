import { shallow } from "enzyme";
import { HomeButton } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<HomeButton />);
  expect(wrapper.exists()).toBeTruthy();
});
