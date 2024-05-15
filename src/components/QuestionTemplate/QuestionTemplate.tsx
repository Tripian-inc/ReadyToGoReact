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
}

const QuestionTemplate: React.FC<IQuestionTemplate> = ({ question, answers, callbackAnswers, flexDirection = 'row' }) => (
  <>
    <div key={question.id}>
      <QuestionContext.Provider
        value={{
          question,
          defaultAnswers: answers,
        }}
      >
        <Question changed={callbackAnswers} flexDirection={flexDirection} />
      </QuestionContext.Provider>
    </div>
  </>
);

export default QuestionTemplate;
