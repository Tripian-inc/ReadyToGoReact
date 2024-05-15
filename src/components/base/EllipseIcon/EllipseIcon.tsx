/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import Approved from '../Svg/Icons/Approved';
import Email from '../Svg/Icons/Email';
import classes from './EllipseIcon.scss';
import Exclamation2 from '../Svg/Icons/Exclamation2';
import Success from '../Svg/Icons/Success';

interface IEllipseIcon {
  name: 'RESET_PASSWORD_EMAIL' | 'RESET_PASSWORD_APPROVED' | 'DELETE_USER' | 'DELETE_USER_SUCCESS';
}

const EllipseIcon: React.FC<IEllipseIcon> = ({ name }) => {
  const icon = useMemo(() => {
    if (name === 'RESET_PASSWORD_EMAIL') return <Email size="60px" />;
    if (name === 'RESET_PASSWORD_APPROVED') return <Approved size="60px" />;
    if (name === 'DELETE_USER') return <Exclamation2 size="80px" />;
    if (name === 'DELETE_USER_SUCCESS') return <Success size="80px" />;
    return <Email />;
  }, [name]);

  return <div className={classes.ellipseIcon}>{icon}</div>;
};

export default EllipseIcon;
