import { shallow } from "enzyme";
import PageContainer from ".";

it("renders without crashing", () => {
  const wrapper = shallow(<PageContainer>Anything</PageContainer>);
  expect(wrapper.exists()).toBeTruthy();
});
