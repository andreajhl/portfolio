import { shallow } from "enzyme";
import { CelebritySimilarVideosReel } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CelebritySimilarVideosReel />);
  expect(wrapper.exists()).toBeTruthy();
});