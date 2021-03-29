import { shallow } from "enzyme";
import Maybe from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<Maybe it={true}>Some thing</Maybe>);
  expect(wrapper.exists()).toBeTruthy();
});
