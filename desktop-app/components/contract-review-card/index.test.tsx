import { shallow } from "enzyme";
import { ContractReviewCard } from "./";

it("should renders without crashing", () => {
  const wrapper = shallow(<ContractReviewCard />);
  expect(wrapper.exists()).toBeTruthy();
});