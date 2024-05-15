/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import ButterflyCard from '../ButterflyCard/ButterflyCard';
import CardSlider from '../CardSlider/CardSlider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './ButterflyCardSlider.scss';
// import PreLoading from '../base/PreLoading/PreLoading';

interface IButterflyCardSlider {
  steps: { step: Model.Step; dayIndex: number }[];
  getThumbsNumber: (step: Model.Step) => number;
  thumbsClicked: (step: Model.Step, thumbs: number) => void;
  thumbsUndo: (step: Model.Step) => void;
  comment: (step: Model.Step, comment: Model.REACTION_COMMENT) => void;
  bodyClicked: (step: Model.Step) => void;
  // showLoadingCard: boolean;
  loadingSteps: { stepId: number; thumbsLoading: boolean }[];
}

const ButterflyCardSlider: React.FC<IButterflyCardSlider> = ({
  steps,
  getThumbsNumber,
  thumbsClicked,
  thumbsUndo,
  // comment,
  bodyClicked,
  //  showLoadingCard,
  loadingSteps,
}) => {
  const card = (step: Model.Step, dayIndex: number) => {
    const loadingStepObj = loadingSteps.find((loadingStep) => loadingStep.stepId === step.id);

    if (loadingStepObj) {
      if (loadingStepObj.thumbsLoading) {
        return (
          <ButterflyCard
            data={{ poi: step.poi, dayIndex, score: step.score }}
            thumbs={getThumbsNumber(step)}
            thumbsClicked={(thumbs: number) => {
              thumbsClicked(step, thumbs);
            }}
            undo={() => thumbsUndo(step)}
            // comment={(choosedComment) => comment(step, choosedComment)}
            bodyClicked={() => bodyClicked(step)}
            thumbsLoading
          />
        );
      }

      // return (
      //   <div className={classes.loadingCard}>
      //     <PreLoading size="large" />
      //   </div>
      // );
    }

    return (
      <ButterflyCard
        data={{ poi: step.poi, dayIndex, score: step.score }}
        thumbs={getThumbsNumber(step)}
        thumbsClicked={(thumbs: number) => {
          thumbsClicked(step, thumbs);
        }}
        undo={() => thumbsUndo(step)}
        // comment={(choosedComment) => comment(step, choosedComment)}
        bodyClicked={() => bodyClicked(step)}
        thumbsLoading={false}
      />
    );
  };

  return (
    <div className={classes.butterflyCardSlider}>
      <CardSlider>
        {steps.map((step: { step: Model.Step; dayIndex: number }) => (
          <div key={`butterfly-card-slider-${step.step.id}`} className={classes.butterflyCard}>
            {card(step.step, step.dayIndex)}
          </div>
        ))}
      </CardSlider>
    </div>
  );
};

export default ButterflyCardSlider;
