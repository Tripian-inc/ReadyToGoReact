// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';

import QuestionContext2 from './Context/QuestionContext2';
import Question2 from './Question/Question2';

interface IQuestionTemplate2 {
  questions: Model.Question[];
  answers: Array<number>;
  callbackAnswers: (answers: Array<number>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  // onFocused: () => void;
  flexDirection?: 'column' | 'row';
  t: (value: Model.TranslationKey) => string;
}

const QuestionTemplate2: React.FC<IQuestionTemplate2> = ({ questions, answers, callbackAnswers, onFocus, onBlur, flexDirection = 'row', t }) => (
  <>
    <div
      key={questions[0].id}
      onFocus={() => {
        if (onFocus) onFocus();
      }}
      onBlur={() => {
        if (onBlur) onBlur();
      }}
    >
      <QuestionContext2.Provider
        value={{
          questions,
          defaultAnswers: answers,
        }}
      >
        <Question2 changed={callbackAnswers} flexDirection={flexDirection} t={t} />
      </QuestionContext2.Provider>
    </div>
  </>
);

export default QuestionTemplate2;
