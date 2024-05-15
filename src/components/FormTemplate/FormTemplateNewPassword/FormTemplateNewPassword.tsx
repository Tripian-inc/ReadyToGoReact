/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import Input from '../../base/Input/Input';
import PreLoading from '../../base/PreLoading/PreLoading';
import Button from '../../base/Button/Button';
import EyeIconButton from '../../base/Button/Icons/EyeIconButton/EyeIconButton';
import Header from '../../base/Header/Header';
import classes from './FormTemplateNewPassword.scss';

interface IFormTemplateNewPassword {
  passwordCallBack: (password: string) => Promise<Model.UserResetPassword>;
  success: (user: Model.UserResetPassword) => void;
  t: (value: Model.TranslationKey) => string;
}

const FormTemplateNewPassword: React.FC<IFormTemplateNewPassword> = ({ passwordCallBack, success, t }) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [error, setError] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'password') {
      setPassword(event.target.value.trim());
    } else if (event.target.name === 'passwordValidate') {
      setPasswordValidate(event.target.value.trim());
    }
  };

  const isValid = () => {
    const passwordValid = helper.passwordFormatValid(password);
    let newWarningMessage = '';

    if (!passwordValid || password === '') {
      newWarningMessage = t('auth.resetPassword.error.passwordFormat');
    } else if (password !== passwordValidate) {
      newWarningMessage = t('auth.resetPassword.error.passwordsNotEqual');
    }

    setWarningMessage(newWarningMessage);

    if (newWarningMessage) {
      setLoading(false);
    }

    return newWarningMessage === '';
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isValid()) {
      setLoading(true);

      passwordCallBack(password)
        .then((user) => {
          success(user);
          // setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !loading) {
      handleSubmit(event);
    }
  };

  return (
    <div onClick={() => {}} role="button" tabIndex={0} onKeyPress={onKeyPress}>
      {loading ? (
        <div className={classes.newPasswordLoading}>
          <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
        </div>
      ) : null}
      <form>
        <div className="row">
          <div className="col col12 my2 pb5">
            <Header text={t('auth.resetPassword.title')} />
          </div>
        </div>
        <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4>{t('auth.resetPassword.password.label')}</h4>
          </div>
          <div className="col col12">
            <Input type={showPassword ? 'text' : 'password'} placeholder={t('auth.resetPassword.password.placeholder')} name="password" value={password} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showPassword} clicked={() => setShowPassword(!showPassword)} />
            </Input>
          </div>
        </div>
        <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4>{t('auth.resetPassword.confirmPassword.label')}</h4>
          </div>
          <div className="col col12">
            <Input type={showPasswordConfirm ? 'text' : 'password'} placeholder={t('auth.resetPassword.confirmPassword.placeholder')} name="passwordValidate" value={passwordValidate} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showPasswordConfirm} clicked={() => setShowPasswordConfirm(!showPasswordConfirm)} />
            </Input>
          </div>
        </div>
        <div className="row center">
          <div className="col col12 my2">
            <Button className={classes.newPasswordButton} color="primary" text={t('auth.resetPassword.submit')} onClick={handleSubmit} />
          </div>
          {error && (
            <div className={`${classes.errorMessage} my10`}>
              <h5>{error}</h5>
            </div>
          )}
          {warningMessage ? (
            <div className="col col12 my10">
              <h5>{warningMessage}</h5>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default FormTemplateNewPassword;
