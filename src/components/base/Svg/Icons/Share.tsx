import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Share: React.FC<IIconSvg> = ({ fill, bgColor, size, className }) => (
  <Svg
    fill={fill}
    bgColor={bgColor}
    size={size}
    className={className}
    viewBox="0 0 20 20"
    path="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z"
  />
);

export default Share;
