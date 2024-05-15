/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classes from './Backdrop.scss';

interface IBackdrop {
  show: boolean;
  clicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  zIndex?: number;
}

const Backdrop: React.FC<IBackdrop> = ({ show, clicked, zIndex }) => (show ? <div className={classes.backdrop} style={{ zIndex }} onClick={clicked} onKeyDown={() => {}} role="button" tabIndex={0} /> : null);

export default Backdrop;
