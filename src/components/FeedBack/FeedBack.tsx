/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import React, { useState } from 'react';
import Button from '../base/Button/Button';
import CloseIconButton2 from '../base/Button/Icons/CloseIconButton2/CloseIconButton2';
import Dropdown from '../base/Dropdown/Dropdown';
import Modal from '../base/Modal/Modal';
import PreLoading from '../base/PreLoading/PreLoading';
import classes from './Feedback.scss';

interface IFeedback {
  feedbackSubjects: Model.FeedbackSubjects[];
  sendFeedback: (value: Model.FeedbackRequest) => Promise<void>;
  showModal: boolean;
  setShowModal: () => void;
  t: (value: Model.TranslationKey) => string;
}

const Feedback: React.FC<IFeedback> = ({ feedbackSubjects, sendFeedback, showModal, setShowModal, t }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedBack] = useState<Model.FeedbackRequest>({
    subjectType: feedbackSubjects[0].subjectType,
    subjectId: feedbackSubjects[0].id,
    desc: '',
  });

  const handleChange = (id: string | number) => {
    const selectedSubject = feedbackSubjects.find((subject) => subject.id === Number(id));

    if (selectedSubject) setFeedBack({ ...feedback, subjectId: selectedSubject.id });
  };

  const setFeedbackDefault = () => {
    setFeedBack({ ...feedback, subjectId: feedbackSubjects[0].id, desc: '' });
  };

  const options = feedbackSubjects.map((subject) => ({
    value: subject.id,
    label: subject.title,
  }));

  // const numbersAndLettersOnly = (input: string) => {
  //   const inputRegex = RegExp('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$');

  //   const escapeRegExp = (string: string): string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  //   if (input === '' || inputRegex.test(escapeRegExp(input))) {
  //     setFeedBack({ ...feedback, desc: input.trimStart() });
  //   }
  // };

  return (
    <Modal
      className={classes.feedbackModal}
      show={showModal}
      backdropClick={() => {
        setShowModal();
      }}
      zIndex={499}
    >
      <div className="row m0">
        <div className="col col12 p5 m0">
          <div>
            <CloseIconButton2
              fill="#2B2B33"
              clicked={() => {
                setShowModal();
              }}
              rounded
            />
          </div>

          {loading ? (
            <div className={classes.feedbackLoading}>
              <PreLoading />
            </div>
          ) : (
            <>
              <div className="col col12">
                <h6 className="mt8 mb4">{t('support.feedback.modal.title')}</h6>
                <Dropdown defaultValue={feedbackSubjects[0].title} options={options} selectChange={handleChange} skippable={false} />
              </div>
              <div className="col col12">
                <h6 className="mt8 mb4">{t('support.feedback.modal.messageTitle')}</h6>
                <textarea
                  name="problem"
                  rows={5}
                  className={classes.feedbackDesc}
                  value={feedback.desc}
                  onChange={(event) => {
                    setFeedBack({ ...feedback, desc: event.target.value });
                    // numbersAndLettersOnly(event.target.value);
                  }}
                />
              </div>
              <div className="row m0 center">
                <div className="col col6 my2">
                  <Button
                    color="primary"
                    text={t('support.feedback.modal.close')}
                    onClick={() => {
                      setShowModal();
                      setFeedbackDefault();
                    }}
                  />
                </div>
                <div className="col col6 my2">
                  <Button
                    color="primary"
                    text={t('support.feedback.modal.send')}
                    onClick={() => {
                      setLoading(true);
                      sendFeedback(feedback).finally(() => {
                        setLoading(false);
                        setFeedbackDefault();
                      });
                    }}
                    disabled={feedback.desc.trim() === ''}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Feedback;
