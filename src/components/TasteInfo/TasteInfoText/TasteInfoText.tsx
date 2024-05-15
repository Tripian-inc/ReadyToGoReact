/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import classes from './TasteInfoText.scss';

interface ITasteInfoText {
  taste: Model.TasteItem;
}

const TasteInfoText: React.FC<ITasteInfoText> = ({ taste }) => (
  <>
    <div className={classes.tasteInfoText}>
      <h2 className={`${classes.tasteInfoTitle} p2`}>{taste.name}</h2>
      <p className={classes.tasteInfoDescription}>{taste.description}</p>
    </div>
  </>
);

export default TasteInfoText;
