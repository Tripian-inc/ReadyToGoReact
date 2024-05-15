import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Restaurant: React.FC<IIconSvg> = ({ fill, bgColor, size, className }) => (
  <Svg fill={fill} bgColor={bgColor} size={size} className={className} viewBox="0 0 18 20" path="M13 4V12H16V20H18V0C15.24 0 13 2.24 13 4ZM8 7H6V0H4V7H2V0H0V7C0 9.21 1.79 11 4 11V20H6V11C8.21 11 10 9.21 10 7V0H8V7Z" />
);

export default Restaurant;
