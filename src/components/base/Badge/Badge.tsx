import React from 'react';
import classes from './Badge.scss';
import CloseIconButton from '../Button/Icons/CloseIconButton/CloseIconButton';

interface IBadge {
  name: string;
  onClose?: (name: string) => void;
}

const Badge: React.FC<IBadge> = ({ name, onClose }) => (
  <div className={classes.badge}>
    <span className={classes.badgeText}>{name}</span>
    <div className={classes.badgeButton}>
      <CloseIconButton fill="#fff" clicked={() => onClose && onClose(name)} />
    </div>
  </div>
);

export default Badge;
