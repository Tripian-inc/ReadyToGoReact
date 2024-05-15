/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import Button from '../base/Button/Button';
import EllipseIcon from '../base/EllipseIcon/EllipseIcon';
import classes from './ResetPasswordApproved.scss';

interface IResetPasswordApproved {
  goBackLogin: () => void;
  t: (value: Model.TranslationKey) => string;
}

const ResetPasswordApproved: React.FC<IResetPasswordApproved> = ({ goBackLogin, t }) => (
  <div>
    <div className="row center mb10">
      <EllipseIcon name="RESET_PASSWORD_APPROVED" />
    </div>
    <div className="row center mb0 mt5">
      <div className="col col12 mb0">
        <h4>{t('auth.resetPassword.success.title')}</h4>
      </div>
    </div>
    <div className="row center">
      <div className="col col12 my2">
        <span className={classes.text}>{t('auth.resetPassword.success.description')}</span>
      </div>
    </div>
    <div className="row center mt5">
      <div className="col col12 my2">
        <Button className={classes.resetPassAppButton} color="primary" text={t('auth.resetPassword.success.button')} onClick={goBackLogin} />
      </div>
    </div>
  </div>
);

export default ResetPasswordApproved;
