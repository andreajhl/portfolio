import { shallow } from "enzyme";
import { BackstageBenefitCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<BackstageBenefitCard />);
  expect(wrapper.exists()).toBeTruthy();
});
