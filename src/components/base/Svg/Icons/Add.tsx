import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Add: React.FC<IIconSvg> = ({ fill, bgColor, size }) => <Svg fill={fill} bgColor={bgColor} size={size} path="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />;

export default Add;
