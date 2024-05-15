/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import Input from '../../base/Input/Input';
import Button from '../../base/Button/Button';
import PreLoading from '../../base/PreLoading/PreLoading';
import BackButton from '../../base/Button/Icons/BackButton/BackButton';
import Header from '../../base/Header/Header';
import classes from './FormTemplateResetPassword.scss';

interface IFormTemplateResetPassword {
  emailCallBack: (email: string) => Promise<Model.UserResetPassword>;
  success: (user: Model.UserResetPassword) => void;
  goBack: () => void;
  t: (value: Model.TranslationKey) => string;
}

const FormTemplateResetPassword: React.FC<IFormTemplateResetPassword> = ({ emailCallBack, success, goBack, t }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [error, setError] = useState(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.trim());
  };

  const isValid = () => {
    const emailValid = helper.emailFormatValid(email);
    let newWarningMessage = '';
    if (!emailValid && email !== '') {
      newWarningMessage = t('auth.forgotPassword.error.emailFormat');
    } else if (email === '') {
      newWarningMessage = t('auth.forgotPassword.error.emailEmpty');
    }
    setWarningMessage(newWarningMessage);
    if (newWarningMessage !== '') {
      setLoading(false);
    }
    return newWarningMessage === '';
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isValid()) {
      setLoading(true);
      emailCallBack(email)
        .then((user) => {
          success(user);
          setLoading(false);
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
        <div className={classes.forgotPasswordLoading}>
          <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
        </div>
      ) : null}
      <form>
        <div className="row">
          <div className="col col12 my2 pb5 px2">
            <BackButton text={t('auth.forgotPassword.back')} clicked={goBack} />
          </div>
        </div>
        <div className="row">
          <div className="col col12 my2 pb5">
            <Header text={t('auth.forgotPassword.title')} />
          </div>
        </div>
        <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4>{t('auth.forgotPassword.email.label')}</h4>
            {/* <span>*</span> */}
          </div>
          <div className="col col12">
            <Input type="email" placeholder={t('auth.forgotPassword.email.placeholder')} name="email" value={email} onChange={handleChange} autocomplete="username" />
          </div>
        </div>
        <div className="row center">
          <div className="col col12 my2">
            <Button className={classes.forgotPassButton} color="primary" text={t('auth.forgotPassword.submit')} onClick={handleSubmit} />
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
        </div>
      </form>
    </div>
  );
};

export default FormTemplateResetPassword;
