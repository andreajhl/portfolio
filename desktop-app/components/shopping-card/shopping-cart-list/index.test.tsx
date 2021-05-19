import { shallow } from "enzyme";
import { ShoppingCardList } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ShoppingCardList />);
  expect(wrapper.exists()).toBeTruthy();
});
