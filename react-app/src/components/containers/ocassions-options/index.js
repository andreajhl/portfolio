import React, { Component } from 'react';
import './styles.scss';
import {occasionsData} from '../../../constants/options';
class index extends Component {
    render() {
        const optionsToRender = Object.keys(occasionsData)
        .map(optionKey =>{
            return (
                <div className={`col option-container ${this.props.currentChoise === optionKey ? 'choose' : ''}`} key={optionKey} onClick={() => this.props.clicked(optionKey)}>
                  <div className={`container-circle ${this.props.currentChoise === optionKey ? 'choose' : ''}`}>
                    <i className={'fas ' + occasionsData[optionKey].icon}></i>
                  </div>
                <span className='container-legend subtitle'>{occasionsData[optionKey].title}</span>
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
