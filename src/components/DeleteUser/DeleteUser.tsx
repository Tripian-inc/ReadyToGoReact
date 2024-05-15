/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model from '@tripian/model';
import Button from '../base/Button/Button';
import EllipseIcon from '../base/EllipseIcon/EllipseIcon';
import PreLoading from '../base/PreLoading/PreLoading';
import classes from './DeleteUser.scss';

interface IDeleteUser {
  goBack: () => void;
  success: () => void;
  userDeleteCallback: () => Promise<Model.DeleteUpdateResponse>;
  t: (value: Model.TranslationKey) => string;
}

const DeleteUser: React.FC<IDeleteUser> = ({ goBack, success, userDeleteCallback, t }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setLoading(true);
    userDeleteCallback()
      .then(() => {
        success();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div>
          <PreLoading />
        </div>
      ) : (
        <div>
          <div className="row center mb10">
            <EllipseIcon name="DELETE_USER" />
          </div>
          <div className="row center mb0 mt5">
            <div className="col col12 mb0">
              <h4>Before Proceeding, Please Note:</h4>
            </div>
          </div>
          <div className="row center">
            <div className="col col12 my2">
              <span className={classes.text}>
                Deleting your account is an irreversible action. Upon confirmation, all data associated with your account will be permanently erased, and you will lose access to your account. This includes any saved trips, settings, and companions.
              </span>
            </div>
          </div>
          <div className="row center mt8">
            <div className="col col12 col6-m center my2">
              <Button className={classes.cancelButton} color="primary" text="Cancel" onClick={goBack} />
            </div>
            <div className="col col12 col6-m center my2">
              <Button color="primary" text="Delete My Account" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;
