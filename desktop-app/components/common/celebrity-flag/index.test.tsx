import { shallow } from "enzyme";
import { CelebrityFlag } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<CelebrityFlag alpha2Code="CO" />);
  expect(wrapper.find("img")).toHaveLength(1);
});
