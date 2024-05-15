// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';

type QuestionAnswerNext = {
  id: number;
  name: string;
  description: string;
  subAnswers: Model.SubAnswer[];
};

export type QuestionNext = {
  id: number;
  name: string;
  order: number;
  selectMultiple: boolean;
  skippable: boolean;
  stepId: number;
  theme: string;
  iconUrl: string;
  title: string;
  description: string;
  category: Model.QUESTIONS_CATEGORY;
  answers: QuestionAnswerNext[];
};
