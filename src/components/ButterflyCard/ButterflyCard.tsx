/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import classes from './ButterflyCard.scss';
import CardImage from './CardImage/CardImage';
import CardText from './CardText/CardText';
// import ThumsDownReason from '../ThumsDownReason/ThumsDownReason';
import PreLoading from '../base/PreLoading/PreLoading';

interface IButterflyCard {
  data: { poi: Model.Poi; dayIndex?: number; score?: number | null };
  thumbs?: number;
  thumbsLoading: boolean;
  thumbsClicked: (like: number) => void;
  undo: () => void;
  // comment: (comment: Model.REACTION_COMMENT) => void;
  bodyClicked: () => void;
}

const ButterflyCard: React.FC<IButterflyCard> = ({ data, thumbs, thumbsLoading, thumbsClicked, undo, /* comment, */ bodyClicked }) => {
  let currentDate;

  if (data.dayIndex === 0) {
    currentDate = 1;
  } else if (data.dayIndex) {
    currentDate = data.dayIndex + 1;
  }

  let Thumbs;
  if (thumbs === 1) {
    Thumbs = (
      <div className={classes.thumbs}>
        {thumbsLoading ? (
          <div className={classes.thumbsLoading}>
            <PreLoading size="small" />
          </div>
        ) : (
          <div className={classes.like} onKeyDown={() => {}} role="button" tabIndex={0} onClick={undo}>
            {' '}
          </div>
        )}
      </div>
    );
  } else if (thumbs === -1) {
    Thumbs = (
      <div className={classes.thumbs}>
        {thumbsLoading ? (
          <div className={classes.thumbsLoading}>
            <PreLoading size="small" />
          </div>
        ) : (
          <div className={classes.dislike} onKeyDown={() => {}} role="button" tabIndex={0} onClick={undo}>
            {' '}
          </div>
        )}
      </div>
    );
  } else if (thumbs === 0) {
    Thumbs = thumbsLoading ? (
      <div className={classes.thumbsLoading}>
        <PreLoading size="small" />
      </div>
    ) : (
      <>
        <div className={classes.thumbs}>
          <div
            className={classes.likeEmpty}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            onClick={() => {
              thumbsClicked(+1);
            }}
          >
            {' '}
          </div>
        </div>
        <div className={classes.thumbs}>
          <div
            className={classes.dislikeEmpty}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            onClick={() => {
              thumbsClicked(-1);
            }}
          >
            {' '}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* {!thumbsLoading && thumbs === -1 ? (
        <ThumsDownReason
          comment={(commentText: Model.REACTION_COMMENT) => {
            comment(commentText);
          }}
          undo={() => {
            undo();
          }}
        />
      ) : ( */}
      <div
        className={classes.card}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
        onClick={() => {
          bodyClicked();
        }}
      >
        <CardImage poi={data.poi} />
        {data.score ? <div className={classes.match}>{`${data.score?.toFixed(0)}% match`}</div> : null}
        <CardText poi={data.poi} dayNumber={currentDate} />
        <div
          className={classes.buttons}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={(event) => {
            // eslint-disable-next-line no-console
            // console.log('div.buttons onClick triggered');
            event.stopPropagation();
          }}
          // onMouseMove={(event) => {
          //   // eslint-disable-next-line no-console
          //   console.log('div.buttons onMouseMove triggered');
          //   event.stopPropagation();
          // }}
          // onTouchMove={(event) => {
          //   // eslint-disable-next-line no-console
          //   console.log('div.buttons onTouchMove triggered');
          //   event.stopPropagation();
          // }}
        >
          {Thumbs}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default ButterflyCard;
