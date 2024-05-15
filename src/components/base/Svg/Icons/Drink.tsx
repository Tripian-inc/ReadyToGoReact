import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Drink: React.FC<IIconSvg> = ({ fill, bgColor, size }) => (
  <Svg
    fill={fill}
    bgColor={bgColor}
    size={size}
    viewBox="0 0 40 40"
    path="M10 5V15C10 19.95 13.6 24.05 18.3333 24.85V31.6667H13.3333V35H26.6667V31.6667H21.6667V24.85C26.4 24.05 30 19.95 30 15V5H10ZM20 21.6667C16.9 21.6667 14.3167 19.5333 13.5667 16.6667H26.4333C25.6833 19.5333 23.1 21.6667 20 21.6667ZM26.6667 13.3333H13.3333V8.33333H26.6667V13.3333Z"
  />
);

export default Drink;
