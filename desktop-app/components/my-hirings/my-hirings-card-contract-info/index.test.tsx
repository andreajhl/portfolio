import { shallow } from "enzyme";
import { MyHiringsCardContractInfo } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardContractInfo />);
  expect(wrapper.exists()).toBeTruthy();
});