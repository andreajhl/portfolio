import { shallow } from "enzyme";
import PageLayout from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<PageLayout>Anything</PageLayout>);
  expect(wrapper.exists()).toBeTruthy();
});
