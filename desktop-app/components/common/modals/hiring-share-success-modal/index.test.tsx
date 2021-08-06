import { shallow } from "enzyme";
import { HiringShareSuccessModal } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<HiringShareSuccessModal contractReference={""} />);
  expect(wrapper.exists()).toBeTruthy();
});
