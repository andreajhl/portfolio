import React, { Component } from 'react';
import {connect} from 'react-redux';
import {paymentsOperations} from "../../../state/ducks/payments";
import './index.scss';

// mapStateToProps
const mapStateToProps = ({payments}) => ({
  contract: payments.getContractToPayReducer.data,
  couponData: payments.fetchDiscountCouponReducer
});
// mapStateToProps
const mapDispatchToProps = {
  checkoutDiscountCoupon: paymentsOperations.discountCouponsGateways
};

class index extends Component {
    constructor(props){
        super(props);
        this.state= {
          discountCoupon: "",
        }
    }
    handleChange = (event)=>{
      this.setState({ discountCoupon: event.target.value})
    }
    handleSubmit = (event) =>{
      event.preventDefault();
      this.props.checkoutDiscountCoupon(this.props.contract.reference, this.state.discountCoupon);
    }
   
    render() {
        return (
          <form onSubmit={this.handleSubmit} className='coupon-container'>
            <label htmlFor='coupon-input'>Ingresa aqui tu cupon de descuento</label>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Ingrese un cupon'
                aria-label=''
                aria-describedby='basic-addon1'
                id='coupon-input'
                value={this.state.discountCoupon}
                onChange={(event) => this.handleChange(event)}
              />
              {this.props.couponData.completed ? (
                <div className='input-group-append'>
                  <span className='input-group-text text-success' >
                    CUPON AGREGADO
                  </span>
                </div>
              ) : (
                <div className='input-group-append'>
                  <button className='btn btn-primary' type='submit'>
                    Aplicar
                  </button>
                </div>
              )}
            </div>
            <span className='font-weight-bold text-danger coupon-error'>
              {this.props.couponData.error_data ? `CUPON NO VALIDO: ${this.props.couponData.error_data}` : null}
            </span>
          </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
