import { shallow } from "enzyme";
import { VimeoIframe } from ".";

const testVimeoId = 597557349;

it("should renders without crashing", () => {
  const wrapper = shallow(<VimeoIframe vimeoId={testVimeoId} />);
  expect(wrapper.exists()).toBeTruthy();
});
