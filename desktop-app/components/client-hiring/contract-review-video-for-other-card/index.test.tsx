import { shallow } from "enzyme";
import { ContractReviewVideoForOtherCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ContractReviewVideoForOtherCard contractData={} />);
  expect(wrapper.exists()).toBeTruthy();
});
