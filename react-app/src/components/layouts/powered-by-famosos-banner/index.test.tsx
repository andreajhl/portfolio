import { shallow } from "enzyme";
import { PoweredByFamososBanner } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<PoweredByFamososBanner />);
  expect(wrapper.exists()).toBeTruthy();
});
