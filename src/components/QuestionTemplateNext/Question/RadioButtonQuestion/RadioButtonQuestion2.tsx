/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import React from 'react';
import RadioButtonGroup from '../../../base/RadioButtonGroup/RadioButtonGroup';

interface IRadioButtonQuestion {
  question: Model.Question;
  defaultAnswer?: number;
  radioButtonChange: (addedOptionId?: number, removedOptionId?: number) => void;
  onFocus: () => void;
  flexDirection: 'column' | 'row';
}

const RadioButtonQuestion2: React.FC<IRadioButtonQuestion> = ({ question, defaultAnswer, radioButtonChange, onFocus, flexDirection }) => {
  const handleChange = (addedOptionId?: number, removedOptionId?: number) => {
    onFocus();
    radioButtonChange(addedOptionId, removedOptionId);
  };

  return (
    <>
      <div style={flexDirection === 'column' ? { display: 'flex', flexDirection: 'column' } : undefined}>
        <RadioButtonGroup skippable={question.skippable} options={question.answers.map((option) => ({ id: option.id, text: option.name }))} defaultSelectedId={defaultAnswer} onChange={handleChange} />
      </div>
    </>
  );
};

export default RadioButtonQuestion2;
