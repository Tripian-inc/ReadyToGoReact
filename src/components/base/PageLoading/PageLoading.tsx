/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PreLoading from '../PreLoading/PreLoading';
import classes from './PageLoading.scss';

const PageLoading = () => (
  <div className={classes.pageLoadimg}>
    <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
  </div>
);

export default PageLoading;
