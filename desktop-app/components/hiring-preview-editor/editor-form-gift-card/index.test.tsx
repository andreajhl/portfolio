import { shallow } from "enzyme";
import { testHiringConfiguration } from "__test__/fake-data/testContract";
import { EditorFormGiftCard } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <EditorFormGiftCard occasion="BIRTHDAY" values={testHiringConfiguration} />
  );
  expect(wrapper.exists()).toBeTruthy();
});
