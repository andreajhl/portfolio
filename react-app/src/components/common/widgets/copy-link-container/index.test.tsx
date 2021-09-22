import { shallow } from "enzyme";
import { CopyLinkContainer } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CopyLinkContainer link="www.prueba.com" />);
  expect(wrapper.exists()).toBeTruthy();
});
