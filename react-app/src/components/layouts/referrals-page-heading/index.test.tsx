import { shallow } from "enzyme";
import { ReferralsPageHeading } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(<ReferralsPageHeading title="Test" />);
  expect(wrapper.exists()).toBeTruthy();
});
