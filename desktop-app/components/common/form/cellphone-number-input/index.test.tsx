import { shallow } from "enzyme";
import { CellphoneNumberInput } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CellphoneNumberInput />);
  expect(wrapper.exists()).toBeTruthy();
});
