// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';

interface IQuestionContext2 {
  questions: Model.Question[];
  defaultAnswers: Array<number>;
}

const questionContext2 = React.createContext<IQuestionContext2>({
  questions: [],
  defaultAnswers: [0],
});

export default questionContext2;
