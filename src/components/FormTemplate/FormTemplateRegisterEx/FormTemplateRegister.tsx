/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import ReCAPTCHA from 'react-google-recaptcha';
import TextField from '../../base/TextField/TextField';
import Button from '../../base/Button/Button';
import BUTTON_TYPES from '../../base/Button/ButtonTypes';
import PreLoading from '../../base/PreLoading/PreLoading';
// import NumberInput from '../../base/NumberInput/NumberInput';
// import QuestionTemplate from '../../QuestionTemplate/QuestionTemplate';
import Modal from '../../base/Modal/Modal';
import Checkbox from '../../base/Checkbox/Checkbox';
import CloseIconButton from '../../base/Button/Icons/CloseIconButton/CloseIconButton';
import EyeIconButton from '../../base/Button/Icons/EyeIconButton/EyeIconButton';
import classes from './FormTemplateRegister.scss';

interface IFormTemplateRegister {
  // profileQuestions?: Model.Question[];
  register: (value: Model.RegisterRequest) => Promise<Model.Token>;
  successRegister: (userEmail: string, token: Model.Token) => void;
  reCaptchaSiteKey: string;
  // showProfileQuestions?: boolean;
  showCaptcha: boolean;
}

const FormTemplateRegister: React.FC<IFormTemplateRegister> = ({ /* profileQuestions, */ register, successRegister, reCaptchaSiteKey, /* showProfileQuestions, */ showCaptcha }) => {
  const [error, setError] = useState(undefined);
  const [verified, setVerified] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [user, setUser] = useState<Model.RegisterRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
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
    } else if (event.target.name === 'passwordValidate') {
      setPasswordValidate(event.target.value.trim());
    }

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
    const passwordValid = helper.passwordFormatValid(user.password);
    let newWarningMessage = '';

    if (user.email === '') {
      newWarningMessage = 'Email cant be empty.';
    } else if (!emailValid) {
      newWarningMessage = 'Email format is not valid.';
    } else if (!passwordValid || user.password === '') {
      newWarningMessage = 'Password needs to be at least 8 character long and must include an lowercase and uppercase letter and a number!';
    } else if (user.password !== passwordValidate) {
      newWarningMessage = 'Passwords not equal.';
    } else if (!tosAccepted) {
      newWarningMessage = 'Please accept the terms of use.';
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
      setWarningMessage('Please verify that you are not a robot.');
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
          <div className="col col12 my2">
            <h4>First Name</h4>
          </div>
          <div className="col col12">
            <TextField type="text" name="firstName" value={user.firstName ? user.firstName : ''} onChange={handleChange} autocomplete="first-name" />
          </div>
        </div>
        <div className="row mb0">
          <div className="col col12 my2">
            <h4>Last Name</h4>
          </div>
          <div className="col col12">
            <TextField type="text" name="lastName" value={user.lastName ? user.lastName : ''} onChange={handleChange} autocomplete="last-name" />
          </div>
        </div>
        <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4>Email</h4>
            <span>*</span>
          </div>
          <div className="col col12">
            <TextField type="email" name="email" value={user.email} onChange={handleChange} autocomplete="username" />
          </div>
        </div>
        <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4>Password</h4>
            <span>*</span>
          </div>
          <div className="col col12">
            <TextField type={showPassword ? 'text' : 'password'} name="password" value={user.password} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showPassword} clicked={() => setShowPassword(!showPassword)} />
            </TextField>
          </div>
        </div>
        <div className="row mb0">
          <div className={`col col12 my2 ${classes.content}`}>
            <h4>Password(Confirm)</h4>
            <span>*</span>
          </div>
          <div className="col col12 my0 ">
            <TextField type={showPasswordConfirm ? 'text' : 'password'} name="passwordValidate" value={passwordValidate} onChange={handleChange} autocomplete="password">
              <EyeIconButton show={showPasswordConfirm} clicked={() => setShowPasswordConfirm(!showPasswordConfirm)} />
            </TextField>
          </div>
          <div className={`col col12 my0 ${classes.termOfUse}`}>
            <Checkbox
              text=""
              style={{ marginRight: '0' }}
              domId="tou"
              checked={tosAccepted}
              onChange={(checked: boolean) => {
                setTosAccepted(checked);
              }}
            />
            <span className={classes.termOfUseText}>
              I accept the <Button className={classes.termsOfUseButton} color="primary" text="Terms of Use" type={BUTTON_TYPES.TEXT} onClick={() => setTosRead(true)} />
            </span>
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
          <div className={classes.closeIconButton}>
            <CloseIconButton
              fill="#fff"
              clicked={() => {
                setWarningMessage('');
                setTosRead(false);
              }}
            />
          </div>
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
        {showCaptcha ? (
          <div className={`row center ${classes.recaptcha}`}>
            <ReCAPTCHA badge="inline" sitekey={reCaptchaSiteKey} onChange={verifyCallback} />
          </div>
        ) : null}
        <div className="row center mb0 px3 mt3">
          <Button className={classes.registerButton} color="primary" text="Sign Up" onClick={handleSubmit} />
          {error ? (
            <div className="col col12 mt10 mb0">
              <h5>{error}</h5>
            </div>
          ) : null}
          {warningMessage ? (
            <div className="col col12 mt10 mb0">
              <h5>{warningMessage}</h5>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default FormTemplateRegister;
