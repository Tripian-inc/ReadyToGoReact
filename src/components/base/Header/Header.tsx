import React from 'react';
import classes from './Header.scss';

interface IHeader {
  text: string;
}

const Header: React.FC<IHeader> = ({ text }) => (
  <div>
    <span className={classes.header}>{text}</span>
  </div>
);

export default Header;
