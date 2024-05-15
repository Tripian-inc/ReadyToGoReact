// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';

interface IQuestionContext {
  question: Model.Question;
  defaultAnswers: Array<number>;
}

const questionContext = React.createContext<IQuestionContext>({
  question: {
    id: 0,
    skippable: false,
    selectMultiple: false,
    name: '',
    category: Model.QUESTIONS_CATEGORY.TRIP,
    order: 0,
    title: '',
    theme: '',
    stepId: -1,
    iconUrl: '',
    description: '',
    answers: [{ id: 0, name: '', subAnswers: [], description: '' }],
  },
  defaultAnswers: [0],
});

export default questionContext;
