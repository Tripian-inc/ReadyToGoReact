/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
// import Model from '@tripian/model';

import Model from '@tripian/model';
import QuestionContext2 from '../Context/QuestionContext2';
import RadioButtonQuestion2 from './RadioButtonQuestion/RadioButtonQuestion2';
// import CheckBoxQuestion from './CheckBoxQuestion/CheckboxQuestion';

interface IQuestion2 {
  changed: (answers: Array<number>) => void;
  flexDirection: 'column' | 'row';
  t: (value: Model.TranslationKey) => string;
}

const Question2: React.FC<IQuestion2> = ({ changed, flexDirection, t }) => {
  const { questions, defaultAnswers } = useContext(QuestionContext2);

  const radioButtonChange = (addedOptionId?: number, removedOptionId?: number) => {
    const newAnswers = [...defaultAnswers];
    if (removedOptionId) {
      newAnswers.splice(newAnswers.indexOf(removedOptionId), 1);
    }
    if (addedOptionId) newAnswers.push(addedOptionId);
    changed(newAnswers);
  };

  // const checkBoxChange = (addedOptionId?: number, removedOptionId?: number) => {
  //   const newAnswers = [...defaultAnswers];
  //   if (removedOptionId) {
  //     newAnswers.splice(newAnswers.indexOf(removedOptionId), 1);
  //   }
  //   if (addedOptionId) {
  //     newAnswers.push(addedOptionId);
  //   }
  //   changed(newAnswers);
  // };

  const defaultAnswer1 = questions[0].answers.find((option) => defaultAnswers.includes(option.id))?.id;
  const defaultAnswer2 = questions[1].answers.find((option) => defaultAnswers.includes(option.id))?.id;

  return (
    <>
      <h3 className="my2">{t('trips.createNewTrip.restaurantQuestion.title')}</h3>
      <h4 style={{ marginBottom: 0, marginTop: '.875rem', float: 'left', width: '9rem' }}>{t('trips.createNewTrip.restaurantQuestion.lunchBrunch')}</h4>
      <RadioButtonQuestion2 question={questions[0]} defaultAnswer={defaultAnswer1} radioButtonChange={radioButtonChange} flexDirection={flexDirection} />
      <h4 style={{ marginBottom: 0, marginTop: '.875rem', float: 'left', width: '9rem' }}>{t('trips.createNewTrip.restaurantQuestion.dinner')}</h4>
      <RadioButtonQuestion2 question={questions[1]} defaultAnswer={defaultAnswer2} radioButtonChange={radioButtonChange} flexDirection={flexDirection} />
      {/* {questions.forEach((question: Model.Question) => {
        // if (question.select_multiple) {
        //   const checkBoxAnswers = question.options.filter((option) => defaultAnswers.includes(option.id)).map(({ id }) => id);
        //   return <CheckBoxQuestion defaultAnswers={checkBoxAnswers} checkBoxChangeParent={checkBoxAnswers} flexDirection={flexDirection} />;
        // }

      })} */}
    </>
  );
};

export default Question2;
