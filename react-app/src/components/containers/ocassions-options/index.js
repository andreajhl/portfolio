import React, { Component } from 'react';
import './styles.scss';
import {occasionsOp} from '../../../constants/options';
class index extends Component {
    render() {
        const optionsToRender = Object.keys(occasionsOp)
        .map(optionKey =>{
            console.log(optionKey)
            return (
                <div className={`col option-container ${this.props.currentChoise === optionKey ? 'choose' : ''}`} key={optionKey} onClick={() => this.props.clicked(optionKey)}>
                  <div className={`container-circle ${this.props.currentChoise === optionKey ? 'choose' : ''}`}>
                    <i className={'fas ' + optionKey}></i>
                  </div>
                <span className='container-legend subtitle'>{occasionsOp[optionKey].title}</span>
                </div>
             
            );
        });

        return (
          <div className=''>
            <h6 className='subtitle'>Selecciona una ocación</h6>
            <div className='row row-cols-4'>
              {optionsToRender}
            </div>
          </div>
        );
    }
}

export default index;
