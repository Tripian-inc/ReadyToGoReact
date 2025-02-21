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
              <h4>{t('user.deleteUser.warningHeader')}</h4>
            </div>
          </div>
          <div className="row center">
            <div className="col col12 my2">
              <span className={classes.text}>{t('user.deleteUser.warningMessage')}</span>
            </div>
          </div>
          <div className="row center mt8">
            <div className="col col12 col6-m center my2">
              <Button className={classes.cancelButton} color="primary" text={t('user.deleteUser.cancel')} onClick={goBack} />
            </div>
            <div className="col col12 col6-m center my2">
              <Button color="primary" text={t('user.deleteUser.deleteMyAccount')} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUser;
