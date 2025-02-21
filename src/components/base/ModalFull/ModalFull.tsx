import React from 'react';
import classes from './ModalFull.scss';

interface IModalFull {
  show: boolean;
  backdropClose?: boolean;
  style?: any;
  className?: string;
  children: React.ReactNode;
}

const ModalFull: React.FC<IModalFull> = ({ show, style = {}, className = '', children }) => {
  const newStyle = { ...style };
  newStyle.transform = show ? 'translate(-50%, -50%)' : 'translateY(-200vh)';
  newStyle.opacity = show ? '1' : '0';

  return (
    <>
      <div className={`${classes.ModalFull} ${className}`} style={{ ...newStyle }}>
        {children}
      </div>
    </>
  );
};

export default ModalFull;
