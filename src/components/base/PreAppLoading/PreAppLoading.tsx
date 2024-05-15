import React from 'react';
import classes from './PreAppLoading.scss';
import PreLoading from '../PreLoading/PreLoading';

const PreAppLoading: React.FC<{ color?: string; size?: 'small' | 'large' | 'default'; children: React.ReactNode }> = ({ color, size, children }) => (
  <div className={classes.preAppLoading}>
    <div className={classes.preLoadingWrapper}>
      <PreLoading size={size} color={color} />
    </div>
    <br />
    {children}
  </div>
);

export default PreAppLoading;
