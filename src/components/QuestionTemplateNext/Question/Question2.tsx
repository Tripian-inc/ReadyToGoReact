/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import Model from '@tripian/model';
import QuestionContext2 from '../Context/QuestionContext2';
import SelectQuestion from './SelectQuestion/SelectQuestion';

interface IQuestion2 {
  changed: (answers: Array<number>) => void;
  flexDirection: 'column' | 'row';
  t: (value: Model.TranslationKey) => string;
}

const Question2: React.FC<IQuestion2> = ({ changed, flexDirection, t }) => {
  const { questions, defaultAnswers } = useContext(QuestionContext2);

  const defaultAnswer1 = questions[0].answers.find((option) => defaultAnswers.includes(option.id))?.id;
  const defaultAnswer2 = questions[1].answers.find((option) => defaultAnswers.includes(option.id))?.id;

  const selectionChanged = (addedOptionId?: number, removedOptionId?: number) => {
    const newAnswers = [...defaultAnswers];
    if (removedOptionId) {
      newAnswers.splice(newAnswers.indexOf(removedOptionId), 1);
    }
    if (addedOptionId) newAnswers.push(addedOptionId);
    changed(newAnswers);
  };

  return (
    <>
      <h4 className="mt7 mb5">{t('trips.createNewTrip.restaurantQuestion.title')}</h4>
      <h5 className="my2">{t('trips.createNewTrip.restaurantQuestion.lunchBrunch')}</h5>
      <SelectQuestion question={questions[0]} defaultAnswer={defaultAnswer1} selectionChanged={selectionChanged} flexDirection={flexDirection} />
      <h4 className="my2">{t('trips.createNewTrip.restaurantQuestion.dinner')}</h4>
      <SelectQuestion question={questions[1]} defaultAnswer={defaultAnswer2} selectionChanged={selectionChanged} flexDirection={flexDirection} />
    </>
  );
};

export default Question2;
