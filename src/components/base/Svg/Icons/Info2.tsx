import React from 'react';
import Svg from '../Svg';
import IIconSvg from './IIconSvg';

const Info2: React.FC<IIconSvg> = ({ fill, bgColor, size = '16px', className }) => (
  <Svg
    className={className}
    fill={fill}
    color={bgColor}
    size={size}
    path="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"
    viewBox="0 0 192 512"
  />
);

export default Info2;
