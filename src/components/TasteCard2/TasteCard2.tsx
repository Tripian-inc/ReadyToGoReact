/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import classes from './TasteCard2.scss';
import TasteCard2Image from './TasteCard2Image/TasteCard2Image';
import TasteCard2Text from './TasteCard2Text/TasteCard2Text';

interface ITasteCard2 {
  taste: Model.TasteItem;
  bodyClicked: (taste: Model.TasteItem) => void;
}

const TasteCard2: React.FC<ITasteCard2> = ({ taste, bodyClicked }) => (
  <div
    className={classes.card}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
    onClick={() => {
      bodyClicked(taste);
    }}
  >
    <TasteCard2Image taste={taste} />
    <TasteCard2Text taste={taste} />
  </div>
);

export default TasteCard2;
