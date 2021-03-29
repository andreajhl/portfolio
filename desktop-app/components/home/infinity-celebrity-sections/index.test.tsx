import { sections } from "constants/celebrities-sections";
import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import { shallow } from "enzyme";
import InfinityCelebritySections from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <InfinityCelebritySections
      celebritiesSections={sections as CelebritySectionType[]}
      loading={false}
      totalResults={3}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
