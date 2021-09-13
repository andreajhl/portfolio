import { shallow } from "enzyme";
import { AboutCelebritySection } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <AboutCelebritySection
      celebrityDescription="Testing description"
      celebrityFullName={"Testing Celebrity"}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
