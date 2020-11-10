import React, { Component } from 'react';
import './index.scss';



class index extends Component {
    constructor(props){
        super(props);
        this.state= {
            coupon: "",
        }
    }
    handleChange = (event)=>{
      console.log(event.target.value)
      this.setState({ coupon: event.target.value})
    }
    render() {
        return (
          <div className='coupon-container'>
            <form>
              <div class='form-group'>
                <label for='coupon' className="ml-auto">Cupon</label>
                <input
                  type='text'
                  class='form-control'
                  id='coupon'
                  placeholder='Ingrese un cupon'
                  value={this.state.coupon}
                  onChange={(event)=>this.handleChange(event)}
                />
                <small id='emailHelp' class='form-text text-muted'>
                  Tienes un codigo de promocion?
                </small>
                <button type="submit" class="btn btn-primary ml-auto">Aplicar</button>
              </div>
            </form>
          </div>
        );
    }
}

export default index;
