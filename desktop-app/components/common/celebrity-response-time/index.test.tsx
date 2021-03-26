import { shallow } from "enzyme";
import { byText } from "__test__/utils";
import { CelebrityResponseTime } from ".";

it("renders without crashing", () => {
  const wrapper = shallow(
    <CelebrityResponseTime
      turnAroundTime={0}
      availableForFlashDeliveries={false}
    />
  );
  expect(wrapper.find(byText("Pocas horas"))).toHaveLength(1);
});
