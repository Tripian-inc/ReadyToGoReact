/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import Button from '../base/Button/Button';
import EllipseIcon from '../base/EllipseIcon/EllipseIcon';
import classes from './DeleteUserSuccess.scss';

interface IDeleteUserSuccess {
  goRegister: () => void;
  t: (value: Model.TranslationKey) => string;
}

const DeleteUserSuccess: React.FC<IDeleteUserSuccess> = ({ goRegister, t }) => (
  <div>
    <div className="row center mb10">
      <EllipseIcon name="DELETE_USER_SUCCESS" />
    </div>
    <div className="row center mb0 mt5">
      <div className="col col12 mb0">
        <h4>{t('user.deleteUser.successHeader')} </h4>
      </div>
    </div>
    <div className="row center">
      <div className="col col12 my2">
        <span className={classes.text}>{t('user.deleteUser.successMessage')} </span>
      </div>
    </div>
    <div className="row center mt8">
      <div className="col col12 my2">
        <Button className={classes.resetPassAppButton} color="primary" text={t('user.deleteUser.createNew')} onClick={goRegister} />
      </div>
    </div>
  </div>
);

export default DeleteUserSuccess;
