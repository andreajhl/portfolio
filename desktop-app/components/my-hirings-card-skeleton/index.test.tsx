import { shallow } from "enzyme";
import { MyHiringsCardSkeleton } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardSkeleton />);
  expect(wrapper.exists()).toBeTruthy();
});