import { shallow } from "enzyme";
import Checkbox from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <Checkbox label="Lorem" onChangeChecked={() => {}} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
