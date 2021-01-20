import React, { Component, Fragment, useState, useEffect } from "react";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { connect } from "react-redux";
import { PageContainer } from "../../layouts";
import "./styles.scss";
import { Container, Row, Col } from "react-bootstrap";
import MetaTags from "react-meta-tags";
import  {PayPalCardForm} from '../../containers/paypal-card-form';
import {SubscriptionPayPalCardForm} from '../../containers/subscription-paypal-card-form';
import SubscriptionCheckoutSummary from "../../containers/subscription-checkout-summary";
import SubscriptionPlansOptions from "../../layouts/subscription-plans-options";

const Subscription = (props) => {
  const {getCelebrity, fetchCelebritySubscriptionPlans,celebrity,celebritySubscriptionPlans, isLoading, isLoadingPlans} = {...props}
  const [currentPlanSelected, setCurrentPlanSelected] = useState(null);
  const onSelectPlan = (planId) => {
    setCurrentPlanSelected(planId);
  };
  useEffect(() => {
    if(celebritySubscriptionPlans.length > 0){
      setCurrentPlanSelected(celebritySubscriptionPlans[0].gatewayIdentifier);
    }
  }, [celebritySubscriptionPlans]);
  useEffect(() => {
    getCelebrity(props.match.params.celebrity_username, true)
    fetchCelebritySubscriptionPlans(props.match.params.celebrity_username)
  },[props.match.params.celebrity_username]);
  
   return (
     <Fragment>
       <MetaTags>
         <title>
           Famosos.com - Videos personalizados de tus famosos favoritos.
         </title>
         <meta
           name='description'
           content='Un blog acerca de tus famosos favoritos que forman parte de nuestra plataforma. Entérate con quien puedes conectarte'
         />
       </MetaTags>
       <PageContainer>
         <Container>
           <Row>
             <div className='container-subscription-payment col-12 my-3 mx-auto c f-rounded f-shadow'>
               <div className='container-subscription-payment__header'>
                 <h6>Resumen de la contratación</h6>
               </div>
               <div className='container-subscription-payment__summary'>
                 <SubscriptionCheckoutSummary
                   celebrityFullName={celebrity.fullName}
                   celebrityAvatar={celebrity.avatar}
                 />
               </div>
               {isLoadingPlans ? null : celebritySubscriptionPlans.length >
                 0 ? (
                 <React.Fragment>
                   <div className='container-subscription-payment__options'>
                     <SubscriptionPlansOptions
                       onOptionClicked={onSelectPlan}
                       currentPlanSelected={currentPlanSelected}
                       optionsList={celebritySubscriptionPlans}
                     />
                   </div>
                   <div
                     className={`container-subscription-payment__paypalForm ${
                       currentPlanSelected ? '' : 'd-none'
                     }`}
                   >
                     {currentPlanSelected ? (
                       <React.Fragment>
                         <SubscriptionPayPalCardForm
                           planId={currentPlanSelected}
                         />
                       </React.Fragment>
                     ) : null}
                   </div>
                 </React.Fragment>
               ) : (
                 <div className='container-subscription-payment__not-available'>
                   <h5>
                     Actualmente este famoso no tiene planes habilitados{' '}
                     <span role='img' aria-label='crying-face'>
                       😢
                     </span>
                   </h5>
                 </div>
               )}
             </div>
           </Row>
         </Container>
       </PageContainer>
     </Fragment>
   );
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.celebrities.getCelebrityReducer.loading,
  isLoadingPlans:
    state.celebrities.fetchCelebritySubscriptionPlansReducer.loading,
  celebrity: state.celebrities.getCelebrityReducer.data,
  celebritySubscriptionPlans:
    state.celebrities.fetchCelebritySubscriptionPlansReducer.data,
});


// mapStateToProps
const mapDispatchToProps = {
  getCelebrity: celebrityOperations.get,
  fetchCelebritySubscriptionPlans: celebrityOperations.fetchCelebritySubscriptionPlans,
};
// Set propTypes
Subscription.propTypes = {};

// Set defaultProps
Subscription.defaultProps = {
};


const _Subscription = connect(mapStateToProps, mapDispatchToProps)(Subscription);
export { _Subscription as Subscription };
