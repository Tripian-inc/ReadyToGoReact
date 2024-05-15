import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const NightLife: React.FC<IIconSvg> = ({ fill, bgColor, size, className }) => (
  <Svg
    fill={fill}
    bgColor={bgColor}
    size={size}
    className={className}
    viewBox="0 0 21 15"
    path="M0.5 0.5H14.5L8.5 9.5V13.5H10.5V15.5H4.5V13.5H6.5V9.5L0.5 0.5ZM9.6 4.5L11 2.5H3.99L5.39 4.5H9.6ZM16.5 0.5H21.5V3.5H18.5V12.5C18.5 14.16 17.16 15.5 15.5 15.5C13.84 15.5 12.5 14.16 12.5 12.5C12.5 10.84 13.84 9.5 15.5 9.5C15.85 9.5 16.19 9.56 16.5 9.67V0.5Z"
  />
);

export default NightLife;
