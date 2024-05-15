/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import classes from './TasteCard.scss';
import Button from '../base/Button/Button';
import ListButton from '../base/Button/Icons/List';
import BUTTON_TYPES from '../base/Button/ButtonTypes';

interface ITasteCard {
  taste: Model.TasteItem;
  tasteClicked: (tasteId: number) => void;
}

const TasteCard: React.FC<ITasteCard> = ({ taste, tasteClicked }) => (
  <>
    <div
      className={classes.tasteCard}
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
      onClick={() => {
        tasteClicked(taste.id);
      }}
    >
      <div className={classes.tastesImage}>
        {/* <ImgLazy src={imgUrl(taste.image, 500, 500, 'Tastes')} alt="" x={500} y={500} /> */}
        <img className={classes.tasteImageItem} src={taste.image.url} alt="" />
      </div>
      <div className={classes.info}>
        <h4 className={classes.tastesName}>{taste.name}</h4>
        <span className={`${classes.tastesDescription} my1`}>{taste.description}</span>
      </div>
      <div className={classes.buttons}>
        <div className="hide-s">
          <Button
            className={classes.listButton}
            iconPath="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
            iconViewBox="0 0 512 512"
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              tasteClicked(taste.id);
            }}
            color="primary"
            type={BUTTON_TYPES.CONTAINED}
            text="Where to Try"
            size="small"
          />
        </div>
        <div className="hide-m">
          <ListButton
            color="primary"
            className={classes.listButton}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              tasteClicked(taste.id);
            }}
          />
        </div>
      </div>
    </div>
  </>
);
export default TasteCard;
