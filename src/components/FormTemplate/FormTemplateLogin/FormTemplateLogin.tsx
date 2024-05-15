/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import ReCAPTCHA from 'react-google-recaptcha';
import Input from '../../base/Input/Input';
import Button from '../../base/Button/Button';
import PreLoading from '../../base/PreLoading/PreLoading';
import SocialLogin from '../../SocialLogin/SocialLogin';
import BUTTON_TYPES from '../../base/Button/ButtonTypes';
import EyeIconButton from '../../base/Button/Icons/EyeIconButton/EyeIconButton';
import Header from '../../base/Header/Header';
import classes from './FormTemplateLogin.scss';

interface IFormTemplateLogin {
  login: (email: string, password: string) => Promise<Model.Token>;
  successLogin: (token: Model.Token) => void;
  reCaptchaSiteKey: string;
  showCaptcha: boolean;
  forgotPassword: () => void;
  socialLoginConfigs: {
    clientId: string;
    domain: string;
    identityProviders: string[];
    region: string;
    baseDomain: string;
  };
  showRegister?: boolean;
  signUpButtonCallBack: () => void;
  t: (value: Model.TranslationKey) => string;
}

const FormTemplateLogin: React.FC<IFormTemplateLogin> = ({ login, successLogin, reCaptchaSiteKey, showCaptcha = true, forgotPassword, socialLoginConfigs, showRegister, signUpButtonCallBack, t }) => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState<boolean>();
  const [user, setUser] = useState({ email: '', password: '' });
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [isRecaptchaActive, setIsRecaptchaActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = { ...user };
    if (event.target.name === 'email') {
      newUser.email = event.target.value.trim();
    } else if (event.target.name === 'password') {
      newUser.password = event.target.value.trim();
    }
    setUser(newUser);
  };

  const isValid = () => {
    const emailValid = helper.emailFormatValid(user.email);
    let newWarningMessage = '';
    if (!emailValid && user.email !== '') {
      newWarningMessage = t('auth.login.error.emailFormat');
    } else if (user.password.length < 6) {
      newWarningMessage = t('auth.register.error.password');
    } else if (user.email === '') {
      newWarningMessage = t('auth.register.error.emailEmpty');
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
    setError(undefined);

    if (recaptchaVerified || !showCaptcha || !isRecaptchaActive) {
      if (isValid()) {
        setLoading(true);
        login(user.email, user.password)
          .then((token) => {
            successLogin(token);
            // setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setIsRecaptchaActive(true);
            setLoading(false);
          });
      }
    } else {
      setWarningMessage(t('auth.login.error.verifyThatYouAreNotaRobot'));
    }
  };

  const verifyCallback = (token: string | null) => {
    if (token) {
      setRecaptchaVerified(true);
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
        <div className={classes.loginLoading}>
          <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
        </div>
      ) : null}
      <form>
        <div className="row">
          <div className="col col12 my2 pb5">
            <Header text={t('auth.login.title')} />
          </div>
        </div>
        <div className="row mb0">
          <div className="col col12 my2">
            <h4 className={classes.header}>{t('auth.login.email.label')}</h4>
          </div>
          <div className="col col12">
            <Input type="email" placeholder={t('auth.login.email.placeholder')} name="email" value={user.email} onChange={handleChange} autocomplete="username" />
          </div>
        </div>
        <div className="row mb0">
          <div className={`col col12 my2 ${classes.passwordContent}`}>
            <h4 className={classes.header}>{t('auth.login.password.label')}</h4>
            <Button className={classes.forgotPasswordButton} text={t('auth.login.forgotPassword')} color="primary" type={BUTTON_TYPES.TEXT} onClick={forgotPassword} />
          </div>
          <div className="col col12">
            <Input type={showPassword ? 'text' : 'password'} placeholder={t('auth.login.password.placeholder')} name="password" value={user.password} onChange={handleChange} autocomplete="current-password">
              <EyeIconButton show={showPassword} clicked={() => setShowPassword(!showPassword)} />
            </Input>
          </div>

          {showCaptcha && isRecaptchaActive ? (
            <div className={`row center mb0 ${classes.recaptcha}`}>
              <ReCAPTCHA badge="inline" sitekey={reCaptchaSiteKey} onChange={verifyCallback} />
            </div>
          ) : null}
          <div className="row center px2 mb0">
            {error && (
              <div className={`${classes.errorMessage} my3`}>
                <h5>{error}</h5>{' '}
              </div>
            )}
            {warningMessage && (
              <div className={`${classes.errorMessage} my3`}>
                <h5>{warningMessage}</h5>
              </div>
            )}
          </div>

          <div className="col col12 my2">
            <Button className={classes.loginButton} color="primary" text={t('auth.login.submit')} onClick={handleSubmit} />
          </div>
        </div>
      </form>

      {/*  "COGNITO", "Google", "SignInWithApple" */}
      {showRegister && (socialLoginConfigs.identityProviders.includes('Google') || socialLoginConfigs.identityProviders.includes('SignInWithApple')) && (
        <>
          <div className="center px2 mt4 mb6">
            <span className={classes.orLoginWith}>{t('auth.login.or')}</span>
          </div>
          <SocialLogin configs={socialLoginConfigs} t={t} />
        </>
      )}

      {showRegister && (
        <div className="mx2 my5 center">
          <span className={classes.dontHaveAccText}>{t('auth.login.account')}</span>
          <Button className={classes.dontHaveAccButton} text={t('auth.login.registerNow')} color="primary" type={BUTTON_TYPES.TEXT} onClick={signUpButtonCallBack} />
        </div>
      )}
    </div>
  );
};

export default FormTemplateLogin;
