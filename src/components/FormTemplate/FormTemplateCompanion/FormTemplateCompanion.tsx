/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { helper } from '@tripian/model';
import NumberInput from '../../base/NumberInput/NumberInput';
import TextField from '../../base/TextField/TextField';
import Dropdown from '../../base/Dropdown/Dropdown';
import QuestionTemplate from '../../QuestionTemplate/QuestionTemplate';

interface IFormTemplateCompanion {
  questions: Array<Model.Question>;
  userCompanion: Model.Companion;
  callbackFormTemplateCompanion: (userCompanion: Model.Companion) => void;
  t: (value: Model.TranslationKey) => string;
}

const FormTemplateCompanion: React.FC<IFormTemplateCompanion> = ({ questions, userCompanion, callbackFormTemplateCompanion, t }) => {
  const callbackName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCompanionState = helper.deepCopy(userCompanion);
    newCompanionState.name = event.target.value;
    callbackFormTemplateCompanion(newCompanionState);
  };

  const callbackNumber = (num: number | null) => {
    const newCompanionState = helper.deepCopy(userCompanion);
    newCompanionState.age = num || 0;
    callbackFormTemplateCompanion(newCompanionState);
  };

  const userCompanionQuestionOnChange = (selectedAnswers: Array<number>) => {
    const newCompanionState = helper.deepCopy(userCompanion);
    newCompanionState.answers = selectedAnswers;
    callbackFormTemplateCompanion(newCompanionState);
  };

  const callbackTitle = (value: React.ReactText) => {
    const newCompanionState = helper.deepCopy(userCompanion);
    newCompanionState.title = value as string;
    callbackFormTemplateCompanion(newCompanionState);
  };

  return (
    <>
      <div className="row m0 mb2">
        <div className="col col12">
          <h5>{t('user.travelCompanions.companionTitle')}</h5>
          <Dropdown options={helper.companionTitleOptions} defaultValue={userCompanion.title} selectChange={callbackTitle} />
        </div>
      </div>
      <div className="row m0 mb2">
        <div className="col col12 col5-m">
          <h5>{t('user.travelCompanions.companionName')}</h5>
          <TextField name="name" value={userCompanion.name} onChange={callbackName} style={{ marginRight: '1rem' }} />
        </div>
        <div className="col col2 hide-s" />
        <div className="col col12 col5-m">
          <h5>{t('user.travelCompanions.companionAge')}</h5>
          {/* AGE TYPE CAN BE CHANGE */}
          <NumberInput minValue={1} maxValue={100} defaultValue={userCompanion.age} onchange={callbackNumber} />
        </div>
      </div>
      <div className="row m0 mb2">
        {questions.map((question) => (
          <div key={question.id} className="col col12">
            <QuestionTemplate question={question} answers={userCompanion.answers} callbackAnswers={userCompanionQuestionOnChange} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FormTemplateCompanion;
