/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ProgressLoading from '../ProgressLoading/ProgressLoading';
import classes from './ProgressAppLoading.scss';

const ProgressAppLoading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={classes.progressAppLoading}>
    {children}
    <br />
    <div className={classes.progressLoadingWrapper}>
      <ProgressLoading bgColor="#38363636" color="#383636" />
    </div>
  </div>
);

export default ProgressAppLoading;
