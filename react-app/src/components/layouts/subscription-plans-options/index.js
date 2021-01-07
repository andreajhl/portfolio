import React from 'react';
import './styles.scss';

const SubscriptionPlanOption = (props) =>{
    const {description, gatewayIdentifier, handlerClick, currentPlanSelected} = {...props};
    console.log(currentPlanSelected === gatewayIdentifier)
    return (
      <div
        className='container-subscription-plan-option'
        onClick={() => handlerClick(gatewayIdentifier)}
      >
        <div className='container-subscription-plan-option__title'>
          <span>{description}</span>
        </div>
        <div className='container-subscription-plan-option__details'>
          <div className='container-subscription-plan-option__details-price'>
            100$ por mes
          </div>
          <div className='container-subscription-plan-option__checked'>
            {currentPlanSelected === gatewayIdentifier ? (
              <i className='fas fa-check'></i>
            ) : null}
          </div>
        </div>
      </div>
    );
}

const SubscriptionPlansOptions = (props) => {
    const {optionsList, onOptionClicked, currentPlanSelected} = {...props}
    const handlerClick = (planId) =>{
        onOptionClicked(planId);
    }
    return (
      <div className='container-subscription-plan-options container'>
        <h5>Planes Disponibles</h5>
        {optionsList.map((option, index) => (
          <SubscriptionPlanOption currentPlanSelected={currentPlanSelected} key={index} {...option} handlerClick={handlerClick}/>
        ))}
      </div>
    );
}

export default SubscriptionPlansOptions;
