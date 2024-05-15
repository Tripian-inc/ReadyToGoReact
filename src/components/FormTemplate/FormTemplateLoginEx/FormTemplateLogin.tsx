/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import ReCAPTCHA from 'react-google-recaptcha';
import TextField from '../../base/TextField/TextField';
import Button from '../../base/Button/Button';
import PreLoading from '../../base/PreLoading/PreLoading';
import classes from './FormTemplateLogin.scss';
// import SocialLogin from '../../SocialLogin/SocialLogin';
import BUTTON_TYPES from '../../base/Button/ButtonTypes';
import EyeIconButton from '../../base/Button/Icons/EyeIconButton/EyeIconButton';

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
      newWarningMessage = 'Email format is not valid';
    } else if (user.password.length < 8) {
      newWarningMessage = 'Password needs to be at least 8 character long';
    } else if (user.email === '') {
      newWarningMessage = 'Email can`t be empty';
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
      setWarningMessage('Please verify that you are not a robot.');
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
        <div className="row mb0">
          <div className="col col12 my2">
            <h4>Email</h4>
          </div>
          <div className="col col12">
            <TextField type="email" name="email" value={user.email} onChange={handleChange} autocomplete="username" />
          </div>
        </div>
        <div className="row mb0">
          <div className="col col12 my2">
            <h4>Password</h4>
          </div>
          <div className="col col12 mb0">
            <TextField type={showPassword ? 'text' : 'password'} name="password" value={user.password} onChange={handleChange} autocomplete="current-password">
              <EyeIconButton show={showPassword} clicked={() => setShowPassword(!showPassword)} />
            </TextField>
            <Button className={classes.forgotPasswordButton} text={t('auth.login.forgotPassword')} color="primary" type={BUTTON_TYPES.TEXT} onClick={forgotPassword} />
          </div>
        </div>

        {showCaptcha && isRecaptchaActive ? (
          <div className={`row center ${classes.recaptcha}`}>
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
          <Button className={classes.loginButton} color="primary" text="Login with Email" onClick={handleSubmit} />
        </div>
      </form>

      {showRegister && (
        <>
          <div className="mx2 mt2 mb5">
            <span className="login-text">Don`t have an account?</span>
            <Button className="login-custom-button" text="Sign Up" color="primary" type={BUTTON_TYPES.TEXT} onClick={signUpButtonCallBack} />
          </div>
          <div className="center px2 mb8">
            <h6 className={classes.horizontalLine}>
              <span>OR</span>
            </h6>
          </div>
          {/* <SocialLogin configs={socialLoginConfigs} /> */}
        </>
      )}
    </div>
  );
};

export default FormTemplateLogin;
