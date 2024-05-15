// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useContext } from 'react';
import RadioButtonBoxGroup from '../../../base/RadioButtonBoxGroup/RadioButtonBoxGroup';
import RadioButtonGroup from '../../../base/RadioButtonGroup/RadioButtonGroup';
import QuestionContext from '../../Context/QuestionContext';

interface IRadioButtonQuestion {
  defaultAnswer?: number;
  radioButtonChange: (addedOptionId?: number, removedOptionId?: number) => void;
  box?: boolean;
  flexDirection: 'column' | 'row';
  // onFocused: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const RadioButtonQuestion: React.FC<IRadioButtonQuestion> = ({ defaultAnswer, radioButtonChange, box = false, flexDirection, onFocus, onBlur }) => {
  const { question } = useContext(QuestionContext);

  const onChange = (addedId?: number, removedId?: number) => {
    // onFocused();
    radioButtonChange(addedId, removedId);
  };

  if (box)
    return (
      <>
        <h4 className="ml1 mb3">{question.name}</h4>
        <div
          style={flexDirection === 'column' ? { display: 'flex', flexDirection: 'column' } : { display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onKeyPress={() => {}}
          role="button"
          tabIndex={0}
          onFocus={() => {
            if (onFocus) onFocus();
          }}
          onBlur={() => {
            if (onBlur) onBlur();
          }}
        >
          <RadioButtonBoxGroup
            skippable={question.skippable}
            options={question.answers.map((option) => ({ id: option.id, text: option.name, description: option.description }))}
            defaultSelectedId={defaultAnswer}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </>
    );

  return (
    <>
      <h4 className="ml1 my2">{question.name}</h4>
      <div
        style={flexDirection === 'column' ? { display: 'flex', flexDirection: 'column' } : undefined}
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          if (onBlur) onBlur();
        }}
      >
        <RadioButtonGroup skippable={question.skippable} options={question.answers.map((option) => ({ id: option.id, text: option.name }))} defaultSelectedId={defaultAnswer} onChange={onChange} />
      </div>
    </>
  );
};

export default RadioButtonQuestion;
