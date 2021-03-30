import { shallow } from "enzyme";
import WhatsapAdForContracts from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<WhatsapAdForContracts celebrityFullName="Lorem" />);
  expect(wrapper.exists()).toBeTruthy();
});
