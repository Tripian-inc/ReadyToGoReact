/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useState } from 'react';
import Model, { helper } from '@tripian/model';
import moment from 'moment';
import TextField from '../../base/TextField/TextField';
import Button from '../../base/Button/Button';
import PreLoading from '../../base/PreLoading/PreLoading';
// import NumberInput from '../../base/NumberInput/NumberInput';
import QuestionTemplate from '../../QuestionTemplate/QuestionTemplate';
import classes from './FormTemplateProfile.scss';
import UserPasswordChange from './UserPasswordChange';
import Notify from '../../base/Notification/Notification';
import Modal from '../../base/Modal/Modal';
import DatePicker from '../../DatePicker/DatePicker';

interface IFormTemplateProfile {
  user: Model.User;
  profileQuestions: Model.Question[];
  updateUser: (userUpdateRequest: Model.UserUpdateRequest) => Promise<Model.User>;
  updateCallback: (updatedUser: Model.User) => void;
  cancel: (value: Model.User) => void;
  forgotPassword: () => void;
  canChangePassword: boolean;
  t: (value: Model.TranslationKey) => string;
}

const FormTemplateProfile: React.FC<IFormTemplateProfile> = ({ user, profileQuestions, updateUser, updateCallback, cancel, forgotPassword, canChangePassword, t }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<{ show: boolean; message?: string }>({ show: false });
  const [showModal, setShowModal] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [userUpdateRequest, setUserUpdateRequest] = useState<Model.UserUpdateRequest>({
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth : undefined,
    answers: [...user.answers].sort((a, b) => a - b),
    password: undefined,
  });

  const [initialUser, setInitialUser] = useState<Model.UserUpdateRequest>({
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth : undefined,
    answers: [...user.answers].sort((a, b) => a - b),
    password: undefined,
  });

  moment.locale(window.twindow.langCode);

  const areDiffObject = (prevObject: Model.UserUpdateRequest, currentObject: Model.UserUpdateRequest) => {
    const prevObjectString = JSON.stringify(prevObject);
    const currentObjectString = JSON.stringify(currentObject);

    if (prevObjectString !== currentObjectString) {
      return true;
    }

    return false;
  };

  const isLightRegistered = useMemo(() => {
    if (user.email.slice(user.email.indexOf('@') + 1) === 'light-tripian.com') {
      return true;
    }
    return false;
  }, [user.email]);

  useEffect(() => {
    const areObjectsDifferent = areDiffObject(initialUser, userUpdateRequest);
    setIsFormChanged(areObjectsDifferent);
  }, [userUpdateRequest, initialUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserUpdateRequest = helper.deepCopy(userUpdateRequest);

    switch (event.target.name) {
      case 'firstName':
        newUserUpdateRequest.firstName = event.target.value.trim();
        break;

      case 'lastName':
        newUserUpdateRequest.lastName = event.target.value.trim();
        break;

      default:
        break;
    }

    setUserUpdateRequest(newUserUpdateRequest);
  };

  const answersChange = (answers: Array<number>) => {
    const newUserUpdateRequest = helper.deepCopy(userUpdateRequest);
    newUserUpdateRequest.answers = answers.sort((a, b) => a - b);
    setUserUpdateRequest(newUserUpdateRequest);
  };

  const dateOfBirthChange = (date: moment.Moment | null) => {
    const newUserUpdateRequest = helper.deepCopy(userUpdateRequest);

    if (date === null) {
      newUserUpdateRequest.dateOfBirth = undefined;
    } else {
      newUserUpdateRequest.dateOfBirth = date.format('YYYY-MM-DD');
    }

    setUserUpdateRequest(newUserUpdateRequest);
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();
    setError('');

    if (isFormChanged) {
      updateUser(userUpdateRequest)
        .then((userSuccessfull) => {
          setInitialUser(helper.deepCopy(userUpdateRequest));
          setSuccessMessage({ show: true, message: t('user.profile.success') });
          updateCallback(userSuccessfull);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className={classes.updateLoading}>
          <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
        </div>
      ) : null}
      <form className={classes.userUpdateForm}>
        {!isLightRegistered ? (
          <div className="row mb0">
            <div className="col col12 my2">
              <h4>{t('user.profile.email')}</h4>
            </div>
            <div className="col col12">
              <TextField type="text" name="email" disabled value="" placeholder={user.email} onChange={() => {}} />
            </div>
          </div>
        ) : null}

        {canChangePassword && (
          <div className="row mb0">
            <Modal className={classes.passwordChangeModal} show={showModal}>
              <UserPasswordChange
                updateCallback={() => {
                  setSuccessMessage({ show: !successMessage.show, message: t('user.profile.changePassword.success') });
                  updateCallback(user);
                  setShowModal(false);
                }}
                updateUser={updateUser}
                close={() => {
                  setShowModal(false);
                }}
                forgotPassword={forgotPassword}
                t={t}
              />
            </Modal>
            <div className="col col12">
              <Button
                color="primary"
                text={t('user.profile.changePassword.button')}
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div>
          </div>
        )}
        <div className="row mb0">
          <div className="col col12 my2">
            <h4>{t('user.profile.firstName.label')}</h4>
          </div>
          <div className="col col12">
            <TextField type="text" name="firstName" value={userUpdateRequest.firstName || ''} placeholder="First Name" onChange={handleChange} autocomplete="first-name" />
          </div>
        </div>
        <div className="row mb0">
          <div className="col col12 my2">
            <h4>{t('user.profile.lastName.label')}</h4>
          </div>
          <div className="col col12">
            <TextField type="text" name="lastName" value={userUpdateRequest.lastName || ''} placeholder="Last Name" onChange={handleChange} autocomplete="last-name" />
          </div>
        </div>
        <div className="row">
          <div className="col col12 my2">
            <h4>{t('user.profile.dateOfBirth')}</h4>
          </div>
          <div className="col col12">
            {/* <NumberInput defaultValue={userUpdateRequest.profile?.age || undefined} placeholder="Age" minValue={1} maxValue={115} onchange={ageChange} /> */}
            <DatePicker
              currentDate={userUpdateRequest.dateOfBirth ? moment(userUpdateRequest.dateOfBirth) : null}
              onchanged={(date: moment.Moment | null) => {
                if (date) dateOfBirthChange(date);
              }}
              isDayBlocked={(date: moment.Moment | null) => {
                if (!date) return false;
                const today = moment();
                const twelveYearsAgo = today.clone().subtract(7, 'years');
                return date.isAfter(today) || date.isAfter(twelveYearsAgo);
              }}
              openDirection="up"
              showMonthSelection
            />
            {/* <TextField type="text" name="dateOfBirth" value={userUpdateRequest.dateOfBirth || ''} placeholder="Date Of Birth" onChange={handleChange} autocomplete="date-of-birth" /> */}
          </div>
        </div>
        <div className="row">
          {profileQuestions.map((question) => (
            <div key={question.id} className="col col12">
              <QuestionTemplate question={question} answers={userUpdateRequest.answers || []} callbackAnswers={answersChange} />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col col6 center">
            <Button
              color="primary"
              text={t('user.profile.cancel').toUpperCase()}
              onClick={() => {
                cancel(user);
              }}
            />
          </div>
          <div className="col col6 center">
            <Button
              color="primary"
              // type={BUTTON_TYPES.CONTAINED}
              text={t('user.profile.submit').toUpperCase()}
              onClick={(event) => {
                handleSubmit(event);
              }}
              disabled={userUpdateRequest.firstName === '' || userUpdateRequest.lastName === '' || !isFormChanged}
            />
          </div>
          {successMessage.show ? (
            <Notify
              type="success"
              title={t('user.profile.updateUserProfile')}
              positionX="right"
              positionY="top"
              message={successMessage.message || ''}
              onClose={() => {
                setSuccessMessage({ show: false });
              }}
              closeMs={3500}
            />
          ) : null}
          {error ? (
            <div className="col col12 my10">
              <h5>{error}</h5>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default FormTemplateProfile;
