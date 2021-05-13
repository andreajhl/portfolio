import { shallow } from "enzyme";
import { MailSharePreview } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<MailSharePreview />);
  expect(wrapper.exists()).toBeTruthy();
});
