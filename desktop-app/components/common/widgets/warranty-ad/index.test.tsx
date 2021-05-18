import { shallow } from "enzyme";
import { WarrantyAd } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<WarrantyAd />);
  expect(wrapper.exists()).toBeTruthy();
});
