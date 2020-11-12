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
    componentDidMount(){
     console.log(this.props.couponData); 

    }
    componentDidUpdate(){
     console.log(this.props.couponData); 
    }
    render() {
        return (
          <div className='coupon-container'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='coupon' className='ml-auto'>
                  Cupon
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='coupon'
                  placeholder='Ingrese un cupon'
                  value={this.state.discountCoupon}
                  onChange={(event) => this.handleChange(event)}
                />
                <small className='form-text text-muted float-right'>
                  Tienes un codigo de promocion?
                </small>
                <h5 className="font-weight-bold text-danger">
                 {this.props.couponData.error_data ? "CUPON NO VALIDO" : null}
                </h5>
                <h5 className="font-weight-bold text-success">
                  {this.props.couponData.completed ? 'CUPON VALIDO' : null}
                </h5>
                <div className='loading' />
                <button type='submit' className='btn btn-primary ml-auto '>
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
