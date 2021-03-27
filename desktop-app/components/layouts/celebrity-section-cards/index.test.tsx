import { sections } from "constants/celebrities-sections";
import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import { shallow } from "enzyme";
import CelebritiesSection from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <CelebritiesSection
      celebritySection={sections[1] as CelebritySectionType}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
