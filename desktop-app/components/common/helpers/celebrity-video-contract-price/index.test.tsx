import { shallow } from "enzyme";
import { CelebrityVideoContractPrice } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityVideoContractPrice />);
  expect(wrapper.exists()).toBeTruthy();
});
