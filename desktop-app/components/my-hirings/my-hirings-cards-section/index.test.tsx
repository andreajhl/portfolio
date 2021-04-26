import { shallow } from "enzyme";
import { MyHiringsCardsSection } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<MyHiringsCardsSection />);
  expect(wrapper.exists()).toBeTruthy();
});