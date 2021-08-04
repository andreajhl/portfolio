import { shallow } from "enzyme";
import { WhatsappSharePreview } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<WhatsappSharePreview />);
  expect(wrapper.exists()).toBeTruthy();
});
