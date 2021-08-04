import { shallow } from "enzyme";
import { ActiveInputField } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <ActiveInputField
      label="Test label"
      showSaveButton={false}
      onClickSave={() => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
