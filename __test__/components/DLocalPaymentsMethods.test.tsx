// import React from "react";
/* eslint-disable jsx-a11y/alt-text */
import { shallow } from "enzyme";
import { DLocalPaymentsMethods } from "../../react-app/src/components/containers/d-local-payments-methods";

describe("DLocalPaymentsMethods", () => {
  const propsTesting = {
    paymentsMethodsAvailable: [
      {
        brand: "Famosos",
        id: 1,
        identifier: "Famosos.com",
        logo: "Star",
        name: "Famosos.com",
        redirect: true
      }
    ],
    paymentMethodType: "CARD",
    contractReference: "2028282",
    isSelected: true,
    buyerData: {
      buyerFullname: "Testing Name",
      buyerEmail: "testing@test.com",
      buyerDocument: "123456"
    },
    discountCounponId: "2222",
    handlerStartPayment: () => {}
  };
  const wrapper = shallow(<DLocalPaymentsMethods {...propsTesting} />);

  it(`should display the check button`, () => {
    expect(wrapper.find(".fa-dot-circle").length).toBe(1);
  });

  it(`should render ${propsTesting.paymentsMethodsAvailable.length} inputs`, () => {
    expect(wrapper.find("input").length).toBe(
      propsTesting.paymentsMethodsAvailable.length
    );
  });
});
