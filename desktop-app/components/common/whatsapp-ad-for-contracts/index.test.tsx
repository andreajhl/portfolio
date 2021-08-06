import { shallow } from "enzyme";
import WhatsappAdForContracts from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<WhatsappAdForContracts celebrityFullName="Lorem" />);
  expect(wrapper.exists()).toBeTruthy();
});
