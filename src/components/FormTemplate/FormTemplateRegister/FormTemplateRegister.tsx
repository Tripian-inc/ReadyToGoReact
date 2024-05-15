/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../../base/Button/Button';
import BUTTON_TYPES from '../../base/Button/ButtonTypes';
import PreLoading from '../../base/PreLoading/PreLoading';
// import NumberInput from '../../base/NumberInput/NumberInput';
// import QuestionTemplate from '../../QuestionTemplate/QuestionTemplate';
import Modal from '../../base/Modal/Modal';
import Checkbox from '../../base/Checkbox/Checkbox';
import BackButton from '../../base/Button/Icons/BackButton/BackButton';
import EyeIconButton from '../../base/Button/Icons/EyeIconButton/EyeIconButton';
import Header from '../../base/Header/Header';
import Input from '../../base/Input/Input';
import CloseIconButton2 from '../../base/Button/Icons/CloseIconButton2/CloseIconButton2';
import classes from './FormTemplateRegister.scss';
import Required from '../../base/Required/Required';

interface IFormTemplateRegister {
  // profileQuestions?: Model.Question[];
  register: (value: Model.RegisterRequest) => Promise<Model.Token>;
  successRegister: (userEmail: string, token: Model.Token) => void;
  reCaptchaSiteKey: string;
  // showProfileQuestions?: boolean;
  showCaptcha: boolean;
  goBackLogin: () => void;
  t: (value: Model.TranslationKey) => string;
}

const FormTemplateRegister: React.FC<IFormTemplateRegister> = ({ /* profileQuestions, */ register, successRegister, reCaptchaSiteKey, /* showProfileQuestions, */ showCaptcha, goBackLogin, t }) => {
  const [error, setError] = useState(undefined);
  const [verified, setVerified] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  // const [passwordValidate, setPasswordValidate] = useState('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [user, setUser] = useState<Model.RegisterRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  // const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [tosAccepted, setTosAccepted] = useState<boolean>(false);
  const [tosRead, setTosRead] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = helper.deepCopy(user);
    if (event.target.name === 'firstName') {
      newUser.firstName = event.target.value;
    } else if (event.target.name === 'lastName') {
      newUser.lastName = event.target.value;
    } else if (event.target.name === 'email') {
      newUser.email = event.target.value.trim();
    } else if (event.target.name === 'password') {
      newUser.password = event.target.value.trim();
    }
    //  else if (event.target.name === 'passwordValidate') {
    //   setPasswordValidate(event.target.value.trim());
    // }

    setUser(newUser);
  };

  /* const ageChange = (age: number | null) => {
    const newUser = helper.deepCopy(user);
    if (newUser.profile) {
      newUser.profile.age = age;
    }
    setUser(newUser);
  }; */

  /* const answersChange = (answers: Array<number>) => {
    const newUser = helper.deepCopy(user);
    if (newUser.profile) {
      newUser.profile.answers = answers;
    }
    setUser(newUser);
  }; */

  const isValid = () => {
    const emailValid = helper.emailFormatValid(user.email);
    // const passwordValid = helper.passwordFormatValid(user.password);
    let newWarningMessage = '';

    if (user.email === '') {
      newWarningMessage = t('auth.register.error.emailEmpty');
    } else if (!emailValid) {
      newWarningMessage = t('auth.register.error.emailFormat');
    } else if (/* !passwordValid || */ user.password.length < 6) {
      // newWarningMessage = 'Password needs to be at least 8 character long  and must include an lowercase and uppercase letter and a number!';
      newWarningMessage = t('auth.register.error.password');
      // } else if (user.password !== passwordValidate) {
      //   newWarningMessage = 'Passwords not equal.';
    } else if (!tosAccepted) {
      newWarningMessage = t('auth.register.error.acceptTheTermsOfUse');
    }

    setWarningMessage(newWarningMessage);

    if (newWarningMessage) {
      setLoading(false);
    }

    return newWarningMessage === '';
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setError(undefined);

    if (verified || !showCaptcha) {
      if (isValid()) {
        setLoading(true);
        register(user)
          .then((userSuccessfull) => {
            successRegister(user.email, userSuccessfull);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
      }
    } else {
      setWarningMessage(t('auth.register.error.verifyThatYouAreNotaRobot'));
    }
  };

  const verifyCallback = (token: string | null) => {
    if (token) {
      setVerified(true);
    }
  };

  return (
    <div>
      {loading ? (
        <div className={classes.registerLoading}>
          <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
        </div>
      ) : null}
      <form>
        <div className="row mb0">
          <div className="col col12 px4">
            <BackButton text={t('auth.register.back')} clicked={goBackLogin} />
          </div>
        </div>
        <div className="row">
          <div className="col col12 my2 pb5 px6">
            <Header text={t('auth.register.title')} />
          </div>
        </div>
        <div className="row mb0">
          <div className="col col12 col6-m">
            <div className="col col12">
              <h4>{t('auth.register.name.label')}</h4>
            </div>
            <div className="col col12">
              <Input type="text" placeholder={t('auth.register.name.placeholder')} name="firstName" value={user.firstName ? user.firstName : ''} onChange={handleChange} autocomplete="first-name" />
            </div>
          </div>
          <div className="col col12 col6-m">
            <div className="col col12">
              <h4>{t('auth.register.surname.label')}</h4>
            </div>
            <div className="col col12">
              <Input type="text" placeholder={t('auth.register.surname.placeholder')} name="lastName" value={user.lastName ? user.lastName : ''} onChange={handleChange} autocomplete="last-name" />
            </div>
          </div>
        </div>

        {/* <div className="row mb0">
          <div className="col col12 mb2">
            <h4>Last Name</h4>
          </div>
          <div className="col col12">
            <Input type="text" name="lastName" value={user.lastName ? user.lastName : ''} onChange={handleChange} autocomplete="last-name" />
          </div>
        </div> */}
        <div className="row mb0">
          <div className="col col12 col6-m mb0">
            <div className={`col col12 ${classes.content}`}>
              <h4>{t('auth.register.email.label')}</h4>
              <Required />
            </div>
            <div className="col col12 mb2">
              <Input placeholder={t('auth.register.email.placeholder')} type="email" name="email" value={user.email} onChange={handleChange} autocomplete="username" />
            </div>
          </div>
          <div className="col col12 col6-m mb0">
            <div className={`col col12 ${classes.content}`}>
              <h4>{t('auth.register.password.label')}</h4>
              <Required />
            </div>
            <div className="col col12 mb2">
              <Input type={showPassword ? 'text' : 'password'} placeholder={t('auth.register.password.placeholder')} name="password" value={user.password} onChange={handleChange} autocomplete="password">
                <EyeIconButton show={showPassword} clicked={() => setShowPassword(!showPassword)} />
              </Input>
            </div>
          </div>
        </div>
        {/* <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4>Password</h4>
            <Required />
          </div>
          <div className="col col12">
            <Input type={showPassword ? 'text' : 'password'} name="password" value={user.password} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showPassword} clicked={() => setShowPassword(!showPassword)} />
            </Input>
          </div>
        </div> */}
        <div className="row mb0">
          {/* <div className={`col col12 my2 ${classes.content}`}>
            <h4>Password(Confirm)</h4>
            <Required />
          </div>
          <div className="col col12 my2 ">
            <Input type={showPasswordConfirm ? 'text' : 'password'} name="passwordValidate" value={passwordValidate} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showPasswordConfirm} clicked={() => setShowPasswordConfirm(!showPasswordConfirm)} />
            </Input>
          </div> */}
          <div className={`col col12 my2 px6 ${classes.termOfUse}`}>
            <Checkbox
              text=""
              style={{ marginRight: '0' }}
              domId="tou"
              checked={tosAccepted}
              onChange={(checked: boolean) => {
                setTosAccepted(checked);
              }}
              className={classes.termOfUseCheckBox}
            />
            <span className={classes.termOfUseText}>
              {t('auth.register.termsOfUse.description')} <Button className={classes.termsOfUseButton} text={t('auth.register.termsOfUse.button')} type={BUTTON_TYPES.TEXT} onClick={() => setTosRead(true)} />
            </span>
          </div>
        </div>

        {showCaptcha ? (
          <div className={`row mb0 center ${classes.recaptcha}`}>
            <ReCAPTCHA badge="inline" sitekey={reCaptchaSiteKey} onChange={verifyCallback} />
          </div>
        ) : null}
        <div className="row mb0 center">
          {error ? (
            <div className={`${classes.errorMessage} my3`}>
              <h5>{error}</h5>
            </div>
          ) : null}
          {warningMessage ? (
            <div className={`${classes.errorMessage} my3`}>
              <h5>{warningMessage}</h5>
            </div>
          ) : null}
        </div>

        <div className="row mb0 center">
          <div className="col col12 col6-m my2">
            <Button className={classes.registerButton} color="primary" text={t('auth.register.submit')} onClick={handleSubmit} />
          </div>
        </div>

        <Modal
          className={classes.termsOfUseModal}
          show={tosRead}
          backdropClick={() => {
            setWarningMessage('');
            setTosRead(false);
          }}
        >
          <CloseIconButton2
            fill="#2B2B33"
            clicked={() => {
              setWarningMessage('');
              setTosRead(false);
            }}
            rounded
          />
          <iframe title="tos" src="https://www.tripian.com/docs/l/tos_t.html" height="100%" width="100%" />
        </Modal>
        {/* {showProfileQuestions ? (
          <>
            <div className="row">
              <div className="col col12 my2">
                <h4>Age</h4>
              </div>
              <div className="col col12">
                <NumberInput defaultValue={user.profile?.age || undefined} placeholder="Age" minValue={1} maxValue={100} onchange={ageChange} />
              </div>
            </div>
            <div className="row">
              {profileQuestions?.map((question) => (
                <div className="col col12">
                  <QuestionTemplate question={question} answers={user.profile?.answers || []} callbackAnswers={answersChange} />
                </div>
              ))}
            </div>
          </>
        ) : null} */}
      </form>
    </div>
  );
};

export default FormTemplateRegister;
