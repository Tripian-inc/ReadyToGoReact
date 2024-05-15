// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import React, { useState } from 'react';
// import Header from '../../../base/Header/Header';
import InfoBox from '../../../base/InfoBox/InfoBox';
import QuestionTemplate from '../../../QuestionTemplateNext/QuestionTemplate';
import QuestionTemplate2 from '../../../QuestionTemplateNext/QuestionTemplate2';
import classes from './StepComponent.scss';

export interface StepComponentProps {
  header: string;
  defaultTip: { iconUrl: string; title: string; description: string };
  stepQuestions: Model.Question[];
  stepId: number;
  tripProfile: Model.TripProfile;
  callbackTripAnswers: (answers: number[]) => void;
  t: (value: Model.TranslationKey) => string;
}

const StepComponent: React.FC<StepComponentProps> = ({ /* header, */ defaultTip, stepQuestions, /* stepId, */ tripProfile, callbackTripAnswers, t }) => {
  const [tip, setTip] = useState<{ iconUrl: string; title: string; description: string }>(defaultTip);

  const onFocus = (qId: number) => {
    const focusedQ = stepQuestions.find((x) => x.id === qId);
    if (focusedQ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      setTip({ title: focusedQ.title, description: focusedQ.description, iconUrl: focusedQ.iconUrl });
    }
  };

  const exploreQuestion = stepQuestions.find((question) => question.id === 6);
  const restaurantsQuestions = stepQuestions.filter((question) => question.id === 11 || question.id === 1111);
  const otherQuestions = stepQuestions.filter((question) => question.id !== 6 && question.id !== 11 && question.id !== 1111);

  return (
    <div>
      {/* <div className="row row py10 px5 mb0">
        <div className="col col12 px0">
          <Header text={header} />
        </div>
      </div> */}
      <div className={`row ${classes.stepComponent}`}>
        <div className={`col col12 col8-m ${classes.stepCompLeft}`}>
          {otherQuestions.map((q) => (
            <QuestionTemplate key={q.id} question={q} answers={tripProfile.answers} callbackAnswers={callbackTripAnswers} flexDirection="row" onFocus={() => onFocus(q.id)} onBlur={() => setTip(defaultTip)} />
          ))}

          {exploreQuestion && <QuestionTemplate question={exploreQuestion} answers={tripProfile.answers} callbackAnswers={callbackTripAnswers} flexDirection="column" onFocus={() => onFocus(exploreQuestion.id)} onBlur={() => setTip(defaultTip)} />}

          {restaurantsQuestions.length > 0 ? (
            <div key={restaurantsQuestions[0].id} className="col col12 col12-m">
              <QuestionTemplate2 questions={restaurantsQuestions} answers={tripProfile.answers} callbackAnswers={callbackTripAnswers} onFocus={() => onFocus(restaurantsQuestions[0].id)} onBlur={() => setTip(defaultTip)} t={t} />
            </div>
          ) : null}
        </div>
        <div className={`col col12 col4-m py5 hide-s ${classes.stepCompRight}`}>
          <InfoBox title={tip.title} description={tip.description} iconUrl={tip.iconUrl} />
        </div>
      </div>
    </div>
  );
};

export default StepComponent;
