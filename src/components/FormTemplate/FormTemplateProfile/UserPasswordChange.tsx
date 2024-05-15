/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import Button from '../../base/Button/Button';
import PreLoading from '../../base/PreLoading/PreLoading';
import Input from '../../base/Input/Input';
import EyeIconButton from '../../base/Button/Icons/EyeIconButton/EyeIconButton';
import CloseIconButton from '../../base/Button/Icons/CloseIconButton/CloseIconButton';
import BUTTON_TYPES from '../../base/Button/ButtonTypes';
import classes from './UserPasswordChange.scss';

interface IUserPasswordChange {
  updateUser: (userUpdateRequest: Model.UserUpdateRequest) => Promise<Model.User>;
  updateCallback: (updatedUser: Model.User) => void;
  forgotPassword: () => void;
  close: () => void;
  t: (value: Model.TranslationKey) => string;
}

const UserPasswordChange: React.FC<IUserPasswordChange> = ({ updateUser, updateCallback, forgotPassword, close, t }) => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState<string>('');
  const [passwordValidate, setPasswordValidate] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'currentPassword') {
      setCurrentPassword(event.target.value.trim());
    } else if (event.target.name === 'password') {
      setPassword(event.target.value.trim());
    } else if (event.target.name === 'passwordValidate') {
      setPasswordValidate(event.target.value.trim());
    }
  };

  const isValid = () => {
    const passwordValid = helper.passwordFormatValid(password || passwordValidate);
    let newWarningMessage = '';
    if (currentPassword === '') {
      newWarningMessage = t('user.profile.changePassword.modal.currentPassword.error.currentPasswordIsEmpty');
    } else if (password === '' || passwordValidate === '' || !passwordValid) {
      newWarningMessage = t('user.profile.changePassword.modal.currentPassword.error.passwordFormat');
    } else if (password !== passwordValidate) {
      newWarningMessage = t('user.profile.changePassword.modal.currentPassword.error.passwordsNotEqual');
    }

    setWarningMessage(newWarningMessage);

    if (newWarningMessage !== '') setLoading(false);

    return newWarningMessage === '';
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    const userUpdateRequestWithOnlyPassword: Model.UserUpdateRequest = {
      firstName: undefined,
      lastName: undefined,
      dateOfBirth: undefined,
      answers: undefined,
      password: password || undefined,
      currentPassword: currentPassword || undefined,
    };

    if (isValid()) {
      updateUser(userUpdateRequestWithOnlyPassword)
        .then((userSuccessfull) => {
          setLoading(false);
          updateCallback(userSuccessfull);
          setPassword('');
          setPasswordValidate('');
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const onClose = () => {
    setWarningMessage('');
    setPassword('');
    setPasswordValidate('');
    setCurrentPassword('');
    close();
  };

  return (
    <>
      <div className={classes.closeIconButton}>
        <CloseIconButton fill="#fff" clicked={onClose} />
      </div>
      <div className="p5 mt5">
        {loading ? (
          <div className={classes.modalLoading}>
            <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
          </div>
        ) : null}

        <div className="row mb0">
          <div className={`col col12 my2 ${classes.passwordContent}`}>
            <h4 className={classes.header}>{t('user.profile.changePassword.modal.currentPassword.label')}</h4>
            <Button className={classes.forgotPasswordButton} text={t('user.profile.changePassword.modal.forgotPassword')} color="primary" type={BUTTON_TYPES.TEXT} onClick={forgotPassword} />
          </div>
          <div className="col col12">
            <Input type={showCurrentPassword ? 'text' : 'password'} placeholder={t('user.profile.changePassword.modal.currentPassword.placeholder')} name="currentPassword" value={currentPassword} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showCurrentPassword} clicked={() => setShowCurrentPassword(!showCurrentPassword)} />
            </Input>
          </div>
        </div>

        <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4 className={classes.header}>{t('user.profile.changePassword.modal.newPassword.label')}</h4>
          </div>
          <div className="col col12">
            <Input type={showPassword ? 'text' : 'password'} placeholder={t('user.profile.changePassword.modal.newPassword.placeholder')} name="password" value={password} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showPassword} clicked={() => setShowPassword(!showPassword)} />
            </Input>
          </div>
        </div>
        <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4 className={classes.header}>{t('user.profile.changePassword.modal.confirmPassword.label')}</h4>
          </div>
          <div className="col col12">
            <Input type={showPasswordConfirm ? 'text' : 'password'} name="passwordValidate" value={passwordValidate} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showPasswordConfirm} clicked={() => setShowPasswordConfirm(!showPasswordConfirm)} />
            </Input>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="row mt5">
          <div className="col col6 center">
            <Button color="primary" text={t('user.profile.changePassword.modal.cancel').toUpperCase()} onClick={onClose} />
          </div>
          <div className="col col6 center">
            <Button
              color="primary"
              text={t('user.profile.changePassword.modal.submit').toUpperCase()}
              onClick={(event) => {
                handleSubmit(event);
              }}
            />
          </div>
        </div>
        {error ? (
          <div className={`${classes.errorMessage} my2`}>
            <h5>{error}</h5>
          </div>
        ) : null}
        <div className="col col12 my2">
          <h5>{warningMessage}</h5>
        </div>
      </div>
    </>
  );
};

export default UserPasswordChange;
