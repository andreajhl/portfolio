import { shallow } from "enzyme";
import { ShareInMailPreview } from ".";

const testPreviewData = {};
it("should renders without crashing", () => {
  const wrapper = shallow(<ShareInMailPreview previewData={testPreviewData} />);
  expect(wrapper.exists()).toBeTruthy();
});
