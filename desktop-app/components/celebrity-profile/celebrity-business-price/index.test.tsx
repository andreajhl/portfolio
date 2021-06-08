import { shallow } from "enzyme";
import { CelebrityBusinessPrice } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<CelebrityBusinessPrice />);
  expect(wrapper.exists()).toBeTruthy();
});
