/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import React, { useState } from 'react';
import Dropdown from '../../../base/Dropdown/Dropdown';

interface ISelectQuestion {
  question: Model.Question;
  defaultAnswer?: number;
  selectionChanged: (addedOptionId?: number, removedOptionId?: number) => void;
  flexDirection: 'column' | 'row';
}

const SelectQuestion: React.FC<ISelectQuestion> = ({ question, defaultAnswer, selectionChanged, flexDirection }) => {
  const [answer, setAnswer] = useState(defaultAnswer);

  const handleChange = (value: string | number) => {
    const removedOptionId = answer;
    const addedOptionId = Number(value);
    selectionChanged(addedOptionId, removedOptionId);
    setAnswer(addedOptionId);
  };

  return (
    <>
      <div style={flexDirection === 'column' ? { display: 'flex', flexDirection: 'column' } : undefined}>
        <Dropdown defaultValue={defaultAnswer} options={question.answers.map((option) => ({ value: option.id, label: option.name }))} selectChange={handleChange} skippable={question.skippable} />
      </div>
    </>
  );
};

export default SelectQuestion;
