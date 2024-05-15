/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classes from './ProgressLoading.scss';

interface IProgressLoading {
  color?: string;
  bgColor?: string;
}

const ProgressLoading: React.FC<IProgressLoading> = ({ color, bgColor }) => (
  <div className={classes.progressloader} style={{ backgroundColor: bgColor }}>
    <div className={classes.indeterminate} style={{ backgroundColor: color }} />
  </div>
);

export default ProgressLoading;
