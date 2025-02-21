import React from 'react';
import classes from './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';

interface IModal {
  show: boolean;
  // backdropClose?: boolean;
  zIndex?: number;
  style?: any;
  className?: string;
  ref?: React.LegacyRef<HTMLDivElement>;
  backdropClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ show, zIndex, backdropClick = () => {}, style = {}, className = '', ref, children }) => {
  const newStyle = { ...style };
  newStyle.transform = show ? 'translate(-50%, -50%)' : 'translateY(-200vh)';
  newStyle.opacity = show ? '1' : '0';
  newStyle.background = show ? 'var(--background-color)' : 'transparent';

  return (
    <>
      <Backdrop show={show} clicked={backdropClick} zIndex={zIndex} />
      <div className={`${classes.modal} ${className}`} style={{ ...newStyle }} ref={ref}>
        {children}
      </div>
    </>
  );
};

export default Modal;
