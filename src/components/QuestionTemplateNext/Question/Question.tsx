// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useContext } from 'react';

import QuestionContext from '../Context/QuestionContext';
import RadioButtonQuestion from './RadioButtonQuestion/RadioButtonQuestion';
import CheckBoxQuestion from './CheckBoxQuestion/CheckboxQuestion';

interface IQuestion {
  changed: (answers: Array<number>) => void;
  flexDirection: 'column' | 'row';
  // onFocused: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Question: React.FC<IQuestion> = ({ changed, flexDirection, onFocus, onBlur }) => {
  const { question, defaultAnswers } = useContext(QuestionContext);

  const radioButtonChange = (addedOptionId?: number, removedOptionId?: number) => {
    const newAnswers = [...defaultAnswers];
    if (removedOptionId) {
      newAnswers.splice(newAnswers.indexOf(removedOptionId), 1);
    }
    if (addedOptionId) newAnswers.push(addedOptionId);
    changed(newAnswers);
  };

  const checkBoxChangeParent = (addedOptionId?: number, removedOptionId?: number) => {
    const subOptions = question.answers.find((option) => option.id === (addedOptionId || removedOptionId))?.subAnswers;

    if (subOptions) {
      const newAnswers = [...defaultAnswers];
      if (removedOptionId) {
        newAnswers.splice(newAnswers.indexOf(removedOptionId), 1);
        subOptions.forEach((subOption) => {
          const subOptionIndex = newAnswers.indexOf(subOption.id);
          if (subOptionIndex !== -1) newAnswers.splice(subOptionIndex, 1);
        });
      }
      if (addedOptionId) {
        newAnswers.push(addedOptionId);
        // const subOptionIds = subOptions.map((option) => option.id);
        // newAnswers.push(...subOptionIds);
      }

      changed(newAnswers);
    } else {
      // eslint-disable-next-line no-console
      console.warn('Adamın sub optionsı yok bana check box change tetiklendi');
    }
  };

  const checkBoxChangeChild = (addedOptionId?: number, removedOptionId?: number) => {
    const newAnswers = [...defaultAnswers];
    if (removedOptionId) {
      newAnswers.splice(newAnswers.indexOf(removedOptionId), 1);
    }
    if (addedOptionId) {
      newAnswers.push(addedOptionId);
    }
    changed(newAnswers);
  };

  if (question.selectMultiple) {
    const checkBoxAnswers = question.answers.filter((option) => defaultAnswers.includes(option.id)).map(({ id }) => id);
    const checkBoxSubAnswers: number[] = [];
    question.answers.forEach((option) => {
      if (option.subAnswers) {
        checkBoxSubAnswers.push(...option.subAnswers.map((subOption) => subOption.id));
      }
    });
    const subOptionsAnswers = checkBoxSubAnswers.filter((subOption) => defaultAnswers.includes(subOption));
    checkBoxAnswers.push(...subOptionsAnswers);

    return <CheckBoxQuestion defaultAnswers={checkBoxAnswers} checkBoxChangeParent={checkBoxChangeParent} checkBoxChangeChild={checkBoxChangeChild} flexDirection={flexDirection} onFocus={onFocus} onBlur={onBlur} />;
  }
  return (
    <RadioButtonQuestion defaultAnswer={question.answers.find((option) => defaultAnswers.includes(option.id))?.id} radioButtonChange={radioButtonChange} box={question.theme === 'box'} flexDirection={flexDirection} onFocus={onFocus} onBlur={onBlur} />
  );
};

export default Question;
