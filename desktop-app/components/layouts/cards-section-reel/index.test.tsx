import { sections } from "constants/celebrities-sections";
import { shallow } from "enzyme";
import { CardsReelSection, CardsReelSectionProps } from ".";

const props: CardsReelSectionProps = {
  itemCount: sections.length,
  itemData: sections,
  children: (data) => <span>{data.title}</span>,
  itemHeight: 200,
  itemWidth: 200
};

it("renders without crashing", () => {
  const wrapper = shallow(<CardsReelSection {...props} />);
  expect(wrapper.exists()).toBeTruthy();
});
