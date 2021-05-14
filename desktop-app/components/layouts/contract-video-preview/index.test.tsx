import { shallow } from "enzyme";
import { ContractVideoPreview } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ContractVideoPreview />);
  expect(wrapper.exists()).toBeTruthy();
});
