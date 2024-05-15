import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Edit: React.FC<IIconSvg> = ({ fill, bgColor, size }) => (
  <Svg fill={fill} bgColor={bgColor} size={size} path="" viewBox="0 0 20 20">
    <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
  </Svg>
);

export default Edit;
