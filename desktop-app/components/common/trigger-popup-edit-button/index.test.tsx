import { shallow } from "enzyme";
import TriggerPopupEditButton from "./";

it("renders without crashing", () => {
  const wrapper = shallow(
    <TriggerPopupEditButton
      label="test label"
      value="test value"
      popupContent={null}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
