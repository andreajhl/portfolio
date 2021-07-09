import { shallow } from "enzyme";
import { EditorForm } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <EditorForm
      contractReference="123123"
      occasion="BIRTHDAY"
      onChange={() => {}}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
