import React from "react";

import { ContractPriceLayout } from "../../layouts/contract-price/index";
import { PriceLayout } from "../../price-layout";

const SubscriptionPlanOption = (props) => {
  const {
    description,
    gateway,
    planId,
    handlerClick,
    currentPlanSelected,
    price
  } = { ...props };
  return (
    <div
      className="container-subscription-plan-option"
      onClick={() => handlerClick(planId)}
    >
      <div className="container-subscription-plan-option__title">
        <span>{description || gateway}</span>
      </div>
      {/* <div className="container-subscription-plan-option__details-price">
        <span>
          {price ? (
            <ContractPriceLayout price={price} rounding={true} currency="USD" />
          ) : (
            ""
          )}
        </span>
      </div> */}
      <div className="container-subscription-plan-option__checked">
        {currentPlanSelected === planId ? (
          <i className="fas fa-check"></i>
        ) : null}
      </div>
    </div>
  );
};

const SubscriptionPlansOptions = (props) => {
  const { optionsList, onOptionClicked, currentPlanSelected, price } = {
    ...props
  };
  const handlerClick = (planId) => {
    onOptionClicked(planId);
  };
  return (
    <div className="container-subscription-plan-options container">
      <h5>Planes Disponibles</h5>
      Mensual{" "}
      <span className="float-right">{<PriceLayout price={price} />}</span>
      {optionsList.map((option, index) => (
        <SubscriptionPlanOption
          currentPlanSelected={currentPlanSelected}
          key={index}
          {...option}
          handlerClick={handlerClick}
        />
      ))}
    </div>
  );
};

export default SubscriptionPlansOptions;
