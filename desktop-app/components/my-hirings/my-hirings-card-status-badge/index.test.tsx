import { shallow } from "enzyme";
import { MyHiringsCardStatusBadge } from "./";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardStatusBadge />);
  expect(wrapper.exists()).toBeTruthy();
});
