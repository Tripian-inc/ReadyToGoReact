// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import QuestionContext from './Context/QuestionContext';
import Question from './Question/Question';

interface IQuestionTemplate {
  question: Model.Question;
  answers: Array<number>;
  callbackAnswers: (answers: Array<number>) => void;
  flexDirection?: 'column' | 'row';
  // onFocused: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const QuestionTemplate: React.FC<IQuestionTemplate> = ({ question, answers, callbackAnswers, flexDirection = 'row', onFocus, onBlur }) => (
  <>
    <div key={question.id} className="col col12 col12-m p2">
      <QuestionContext.Provider
        value={{
          question,
          defaultAnswers: answers,
        }}
      >
        <Question changed={callbackAnswers} flexDirection={flexDirection} onFocus={onFocus} onBlur={onBlur} />
      </QuestionContext.Provider>
    </div>
  </>
);

export default QuestionTemplate;
