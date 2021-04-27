import { shallow } from "enzyme";
import { MyHiringsCardStepsBanner } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardStepsBanner />);
  expect(wrapper.exists()).toBeTruthy();
});