import { shallow } from "enzyme";
import { CloseModalButton } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CloseModalButton />);
  expect(wrapper.exists()).toBeTruthy();
});