import React, { Component, Fragment, useState, useEffect } from "react";
import { celebrityOperations } from "../../../state/ducks/celebrities";
import { connect } from "react-redux";
import "./styles.scss";
import { FEED_SUBSCRIPTION } from "../../../routing/Paths";


const SubscriptionSuccess = (props) => {
  const {getCelebrity, celebrity, isLoading} = {...props}
  useEffect(() => {
    getCelebrity(props.match.params.celebrity_username, true)
  },[props.match.params.celebrity_username]);
   return (
     <div className='container-subscribe-success container-fluid'>
       <div className='row justify-content-center f-container'>
         <div className='col-12 col-md-6 col-xl-4 mx-auto text-center f-card'>
           <div className='w-100 mx-auto text-center logo-famosos'>
             <img
               width='170px'
               src={'/assets/img/dark-famosos-logo.svg'}
               alt='avatar'
             />
           </div>
           <div className='rounded-circle'>
             <img
               className='rounded-circle'
               src={
                 isLoading
                   ? '/assets/img/avatar-blank.png'
                   : celebrity.avatar || ''
               }
               alt='avatar'
             />
           </div>
           <div className='mt-4 font-weight-bold'>
             <h5 className={'font-weight-bold'}>¡Felicitaciones!</h5>
             <h5 className={'font-weight-bold'}>
               {' '}
               Se ha realizado con éxito la suscripción a {celebrity.fullName}.
             </h5>
           </div>
           <div className='mt-4 pl-3 pr-3 font-weight-light text-left'>
             <h6>
               Ahora haces parte de Famosos Prime {celebrity.fullName}, eso
               quiere decir accedes a los siguientes beneficios:
             </h6>
             <ul>
               <li>Acceso a contenido exclusivo de {celebrity.fullName}</li>
               <li>
                 Descuento en compras de videomensajes de {celebrity.fullName}
               </li>
               <li>
                 Invitación a eventos gratuitos y pagos con {celebrity.fullName}
               </li>
               <li>Muchas sorpresas más.</li>
             </ul>
           </div>
           <p>
             El cobro de la suscripción se hará recurrente cada 30 días.
             Recibirás una notificación cada vez que se realice tu cobro.
           </p>
           <button
             className='btn btn-primary mb-4'
             onClick={() => props.history.push(FEED_SUBSCRIPTION)}
           >
             Ver mis suscripciones
           </button>
         </div>
       </div>
     </div>
   );
};

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.celebrities.getCelebrityReducer.loading,
  celebrity: state.celebrities.getCelebrityReducer.data
});


// mapStateToProps
const mapDispatchToProps = {
  getCelebrity: celebrityOperations.get,
};
// Set propTypes
SubscriptionSuccess.propTypes = {};

// Set defaultProps
SubscriptionSuccess.defaultProps = {
};


const _SubscriptionSuccess = connect(mapStateToProps, mapDispatchToProps)(SubscriptionSuccess);
export { _SubscriptionSuccess as SubscriptionSuccess };
