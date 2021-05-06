import { shallow } from "enzyme";
import VideoContractsFavorites from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<VideoContractsFavorites />);
  expect(wrapper.exists()).toBeTruthy();
});
