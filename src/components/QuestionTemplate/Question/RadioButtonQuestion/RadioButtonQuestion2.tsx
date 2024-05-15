/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import React from 'react';
import RadioButtonGroup from '../../../base/RadioButtonGroup/RadioButtonGroup';

interface IRadioButtonQuestion {
  question: Model.Question;
  defaultAnswer?: number;
  radioButtonChange: (addedOptionId?: number, removedOptionId?: number) => void;
  flexDirection: 'column' | 'row';
}

const RadioButtonQuestion2: React.FC<IRadioButtonQuestion> = ({ question, defaultAnswer, radioButtonChange, flexDirection }) => (
  <div style={flexDirection === 'column' ? { display: 'flex', flexDirection: 'column' } : undefined}>
    <RadioButtonGroup skippable={question.skippable} options={question.answers.map((option) => ({ id: option.id, text: option.name }))} defaultSelectedId={defaultAnswer} onChange={radioButtonChange} />
  </div>
);

export default RadioButtonQuestion2;
