/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import classes from './Notification.scss';

interface INotification {
  title?: string;
  message: string;
  type: 'success' | 'warning' | 'error';
  onClose: () => void;
  closeMs?: number;
  positionX?: 'left' | 'center' | 'right';
  positionY?: 'top' | 'bottom';
}

const Notification: React.FC<INotification> = ({ title, message, onClose, closeMs = 0, type = 'error', positionX = 'right', positionY = 'top' }) => {
  const actionNotificationClasses = [classes.notification];
  if (type === 'success') {
    actionNotificationClasses.push(classes.success);
  } else if (type === 'warning') {
    actionNotificationClasses.push(classes.warning);
  } else actionNotificationClasses.push(classes.error);

  if (positionX === 'left') {
    actionNotificationClasses.push(classes.left);
  } else if (positionX === 'center') {
    actionNotificationClasses.push(classes.center);
  } else actionNotificationClasses.push(classes.right);

  if (positionY === 'bottom') {
    actionNotificationClasses.push(classes.bottom);
  } else actionNotificationClasses.push(classes.top);

  useEffect(() => {
    let t: NodeJS.Timeout | undefined;
    if (closeMs !== 0) {
      t = setTimeout(() => {
        onClose();
      }, closeMs);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [closeMs, onClose]);

  return (
    <div className={actionNotificationClasses.join(' ')}>
      <button
        type="button"
        className={classes.closeButton}
        onClick={() => {
          onClose();
        }}
      >
        x
      </button>
      <h4>{title || 'Error'}</h4>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
