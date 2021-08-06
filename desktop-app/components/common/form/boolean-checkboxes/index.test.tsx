import { shallow } from "enzyme";
import { BooleanRadiosInputs } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<BooleanRadiosInputs value={false} />);
  expect(wrapper.exists()).toBeTruthy();
});
