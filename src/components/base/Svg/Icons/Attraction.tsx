import React from 'react';
import Svg from '../Svg';
import IIconSvg from './IIconSvg';

const Attraction: React.FC<IIconSvg> = ({ fill, bgColor, size = '20px', className }) => (
  <Svg
    className={className}
    fill={fill}
    color={bgColor}
    size={size}
    path="M20 0V2H18V0H16V2H14V0H12V4L14 6V7H8V6L10 4V0H8V2H6V0H4V2H2V0H0V4L2 6V12L0 14V18H9V15C9 13.9 9.9 13 11 13C12.1 13 13 13.9 13 15V18H22V14L20 12V6L22 4V0H20ZM20 16H15V15C15 12.79 13.21 11 11 11C8.79 11 7 12.79 7 15V16H2V14.83L4 12.83V5.17L2.83 4H7.17L6 5.17V9H16V5.17L14.83 4H19.17L18 5.17V12.83L20 14.83V16Z"
    viewBox="0 0 22 18"
  />
);

export default Attraction;
