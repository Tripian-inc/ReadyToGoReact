/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { helper } from '@tripian/model';
import TextField from '../../../../components/base/TextField/TextField';
import Button from '../../../../components/base/Button/Button';
import classes from './OpeningsForm.scss';

interface IOpeningsForm {
  defaultUserInfo?: { firstName: string; lastName: string; email: string; phone: string; note?: string };
  openingsFormCallback: (firstName: string, lastName: string, email: string, phone: string, note?: string) => void;
}

const OpeningsForm: React.FC<IOpeningsForm> = ({ openingsFormCallback, defaultUserInfo }) => {
  const [error, setError] = useState(undefined);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [user, setUser] = useState(
    defaultUserInfo || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      note: '',
    },
  );
  const [isFormChanged, setIsFormChanged] = useState<boolean>(!!defaultUserInfo);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUser = helper.deepCopy(user);
    if (event.target.name === 'firstName') {
      newUser.firstName = event.target.value;
    } else if (event.target.name === 'lastName') {
      newUser.lastName = event.target.value;
    } else if (event.target.name === 'email') {
      newUser.email = event.target.value.trim();
    } else if (event.target.name === 'phone') {
      newUser.phone = event.target.value.trim();
    } else if (event.target.name === 'note') {
      newUser.note = event.target.value;
    }
    setIsFormChanged(true);
    setUser(newUser);
  };

  const isValid = () => {
    const emailValid = helper.emailFormatValid(user.email);
    let newWarningMessage = '';

    if (user.firstName === '') {
      newWarningMessage = 'First name can`t be empty';
    } else if (user.lastName === '') {
      newWarningMessage = 'Last name can`t be empty';
    } else if (user.email === '') {
      newWarningMessage = 'Email can`t be empty';
    } else if (!emailValid) {
      newWarningMessage = 'Email format is not valid';
    } else if (user.phone === '') {
      newWarningMessage = 'Mobile number can`t be empty';
    }

    setWarningMessage(newWarningMessage);

    return newWarningMessage === '';
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setError(undefined);
    if (isValid()) {
      openingsFormCallback(user.firstName, user.lastName, user.email, user.phone, user.note);
    }
  };

  return (
    <div>
      <form className={classes.openingsForm}>
        <div className="row">
          <div className="col col12 col6-m">
            <TextField placeholder="First Name" type="text" name="firstName" value={user.firstName || ''} onChange={handleChange} autocomplete="first-name" />
          </div>

          <div className="col col12 col6-m">
            <TextField placeholder="Last Name" type="text" name="lastName" value={user.lastName || ''} onChange={handleChange} autocomplete="last-name" />
          </div>

          <div className="col col12 col6-m">
            <TextField placeholder="Email Address" type="email" name="email" value={user.email || ''} onChange={handleChange} autocomplete="username" />
          </div>

          <div className="col col12 col6-m">
            <TextField placeholder="Mobile Number" type="number" name="phone" value={user.phone || ''} onChange={handleChange} autocomplete="phone-number" />
          </div>

          <div className="col col12">
            <TextField placeholder="Note (Optional)" type="text" name="note" value={user.note || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="row mb0 center">
          <Button color={isFormChanged ? 'primary' : 'disabled'} text="Confirm Reservation" onClick={handleSubmit} />
          {error ? (
            <div className="col col12 my10">
              <h5>{error}</h5>
            </div>
          ) : null}
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

export default OpeningsForm;
