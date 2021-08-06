import { shallow } from "enzyme";
import { ShareGiftDropdownButton } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ShareGiftDropdownButton deliveryTo="Ana" contractReference="123-123-123" />
  );
  expect(wrapper.exists()).toBeTruthy();
});
