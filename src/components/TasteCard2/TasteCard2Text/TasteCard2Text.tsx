/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import classes from './TasteCard2Text.scss';

interface ITasteCard2Text {
  taste: Model.TasteItem;
}

const TasteCard2Text: React.FC<ITasteCard2Text> = ({ taste }) => (
  <div className={classes.tasteCard2Text}>
    <h4>{taste.name}</h4>
    <p className={classes.attraction}>{taste.description}</p>
  </div>
);

export default TasteCard2Text;
