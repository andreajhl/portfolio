import { shallow } from "enzyme";
import { PageHeading } from "./";
import { byText } from "../../../../__test__/utils";

it("should renders without crashing", () => {
  const testTitle = "Test title";
  const wrapper = shallow(<PageHeading>{testTitle}</PageHeading>);

  // should render the title
  expect(wrapper.find(byText(testTitle))).toHaveLength(1);
});
