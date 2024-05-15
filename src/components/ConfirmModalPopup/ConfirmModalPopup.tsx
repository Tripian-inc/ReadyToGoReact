import React from 'react';
import Modal from '../base/Modal/Modal';
import Button from '../base/Button/Button';
import CloseIconButton from '../base/Button/Icons/CloseIconButton/CloseIconButton';
import classes from './ConfirmModalPopup.scss';

interface IConfirmModalPopup {
  openModalPopup: boolean;
  text: string;
  // buttonColor: string;
  confirmButtonText: string;
  cancelButtonText: string;
  className?: string;
  action: () => Promise<any>;
  confirmationCallback: (message?: string) => void;
  cancelCallback: () => void;
}

const ConfirmModalPopup: React.FC<IConfirmModalPopup> = ({
  openModalPopup = false,
  text,
  // buttonColor,
  confirmButtonText,
  cancelButtonText,
  className = '',
  action,
  confirmationCallback,
  cancelCallback,
}) => {
  const confirm = () => {
    action()
      .then(() => {
        confirmationCallback();
      })
      .catch((err) => {
        confirmationCallback(err);
      });
  };

  return (
    <Modal
      show={openModalPopup}
      backdropClick={() => {
        cancelCallback();
      }}
      className={className}
    >
      <div className="row center mt6">
        <div className={classes.closeIcon}>
          <CloseIconButton fill="#fff" clicked={cancelCallback} />
        </div>
        <div className="col col12 mt1">
          <span>{text}</span>
        </div>
        <div className="col col12 mt3">
          <Button color="primary" style={{ marginRight: '1rem' }} text={confirmButtonText} onClick={confirm} />
          <Button
            color="primary"
            text={cancelButtonText}
            onClick={() => {
              cancelCallback();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModalPopup;
