import { shallow } from "enzyme";
import { ReferralsListItem } from ".";

it("should renders without crashing", () => {
  const wrapper = shallow(
    <ReferralsListItem
      referral={{
        email: "",
        fullName: "Carolina López",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=stefan-stefancik-QXevDflbl8A-unsplash.jpg&w=640",
        isBuyCompleted: true,
      }}
    />
  );
  expect(wrapper.exists()).toBeTruthy();
});
