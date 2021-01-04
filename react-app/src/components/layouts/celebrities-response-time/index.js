import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
const CelebritiesResponseTime = ({turnAroundTime}) => {
    console.log(turnAroundTime)
    const getTurnAroundText = () => {
      if (turnAroundTime < 1) {
        return <span>Pocas horas</span>;
      } else if (turnAroundTime === 1) {
        return (
          <span >
            {parseInt(turnAroundTime)} día
          </span>
        );
      } else {
        return (
          <span >
            {parseInt(turnAroundTime)} días
          </span>
        );
      }
    };
  
    return (
        <span style={{ fontSize: '12px' }}>Respuesta promedio : {getTurnAroundText()}</span>
    );
}
CelebritiesResponseTime.propTypes={
    turnAroundTime: PropTypes.number
}
export default CelebritiesResponseTime;
