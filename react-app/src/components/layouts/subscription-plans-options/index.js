import React from "react";
import "./styles.scss";
import { ContractPriceLayout } from "../../layouts/contract-price/index";
const SubscriptionPlanOption = (props) => {
  const {
    description,
    gatewayIdentifier,
    handlerClick,
    currentPlanSelected,
    price
  } = { ...props };
  return (
    <div
      className='container-subscription-plan-option'
      onClick={() => handlerClick(gatewayIdentifier)}
    >
      <div className='container-subscription-plan-option__title'>
        <span>{description ? description : ""}</span>
      </div>
      <div className='container-subscription-plan-option__details-price'>
        <span>
          {price ? (
            <ContractPriceLayout price={price} rounding={true} currency='USD' />
          ) : (
            ""
          )}
        </span>
      </div>
      <div className='container-subscription-plan-option__checked'>
        {currentPlanSelected === gatewayIdentifier ? (
          <i className='fas fa-check'></i>
        ) : null}
      </div>
    </div>
  );
};

const SubscriptionPlansOptions = (props) => {
  const { optionsList, onOptionClicked, currentPlanSelected } = { ...props };
  const handlerClick = (planId) => {
    onOptionClicked(planId);
  };
  return (
    <div className='container-subscription-plan-options container'>
      <h5>Planes Disponibles</h5>
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
