// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useContext } from 'react';
import RadioButtonGroup from '../../../base/RadioButtonGroup/RadioButtonGroup';
import QuestionContext from '../../Context/QuestionContext';

interface IRadioButtonQuestion {
  defaultAnswer?: number;
  radioButtonChange: (addedOptionId?: number, removedOptionId?: number) => void;
  flexDirection: 'column' | 'row';
}

const RadioButtonQuestion: React.FC<IRadioButtonQuestion> = ({ defaultAnswer, radioButtonChange, flexDirection }) => {
  const { question } = useContext(QuestionContext);

  return (
    <>
      <h3 className="my2">{question.name}</h3>
      <div style={flexDirection === 'column' ? { display: 'flex', flexDirection: 'column' } : undefined}>
        <RadioButtonGroup skippable={question.skippable} options={question.answers.map((option) => ({ id: option.id, text: option.name }))} defaultSelectedId={defaultAnswer} onChange={radioButtonChange} />
      </div>
    </>
  );
};

export default RadioButtonQuestion;
