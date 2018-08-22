import React from 'react';
import { styles } from '../constants';
import { getCircumference } from '../helpers';

const AvailabilityCircle = props => {
  return (
    <div className="availability-circle">
      <img src="/images/thunder.svg" alt="reservable icon" />
      <svg height="100" width="100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={styles.jp_green}
          strokeWidth="3"
          fill="none"
          strokeDasharray={getCircumference(40)}
          strokeDashoffset={
            getCircumference(40) -
            getCircumference(40) * (props.availability / 100)
          }
        />
      </svg>
    </div>
  );
};

export default AvailabilityCircle;
