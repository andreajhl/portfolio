import { shallow } from "enzyme";
import { MyHiringsCard } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCard />);
  expect(wrapper.exists()).toBeTruthy();
});