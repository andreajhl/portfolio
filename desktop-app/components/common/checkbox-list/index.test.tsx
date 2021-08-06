import { shallow } from "enzyme";
import CheckBoxList from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <CheckBoxList
      title="Lorem"
      options={[{ label: "Flash (24hrs)", value: "flash", checked: true }]}
      onCheckOption={() => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
