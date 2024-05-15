/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ArrowLeftButton from '../ArrowLeftButton/ArrowLeftButton';
import classes from './BackButton.scss';

interface IBackButton {
  clicked: () => void;
  text?: string;
  fill?: string;
}

const BackButton: React.FC<IBackButton> = ({ clicked, text, fill }) => (
  <div className={classes.backButton}>
    <ArrowLeftButton fill={fill} clicked={clicked} />
    {text && <span className={classes.backButtonText}>{text}</span>}
  </div>
);

export default BackButton;
