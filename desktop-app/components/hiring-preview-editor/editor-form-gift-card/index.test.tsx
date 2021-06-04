import { shallow } from "enzyme";
import { EditorFormGiftCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<EditorFormGiftCard />);
  expect(wrapper.exists()).toBeTruthy();
});
