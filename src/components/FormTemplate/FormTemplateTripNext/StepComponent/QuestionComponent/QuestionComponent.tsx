// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import React from 'react';
import QuestionTemplate from '../../../../QuestionTemplateNext/QuestionTemplate';

export interface QuestionComponentProps {
  question: Model.Question;
  tripProfile: Model.TripProfile;
  callbackTripAnswers: (answers: number[]) => void;
  // onFocused: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, tripProfile, callbackTripAnswers, onFocus, onBlur }) => {
  if (question.theme === 'tree') {
    return (
      <div className="col col12">
        <QuestionTemplate question={question} answers={tripProfile.answers} callbackAnswers={callbackTripAnswers} flexDirection="column" onFocus={onFocus} onBlur={onBlur} />
      </div>
    );
  }

  if (question.selectMultiple === true) {
    return <div>Not implemented yet.</div>;
  }

  return <QuestionTemplate question={question} answers={tripProfile.answers} callbackAnswers={callbackTripAnswers} flexDirection="row" onFocus={onFocus} onBlur={onBlur} />;
};

export default QuestionComponent;
