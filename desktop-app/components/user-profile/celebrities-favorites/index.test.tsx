import { shallow } from "enzyme";
import { CelebritiesFavoritesEdit } from ".";

it.skip("renders without crashing", () => {
  const wrapper = shallow(<CelebritiesFavoritesEdit />);
  expect(wrapper.exists()).toBeTruthy();
});
