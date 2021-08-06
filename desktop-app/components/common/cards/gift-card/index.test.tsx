import { shallow } from "enzyme";
import { GiftCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<GiftCard />);
  expect(wrapper.exists()).toBeTruthy();
});
