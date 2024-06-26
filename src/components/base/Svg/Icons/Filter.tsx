import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Filter: React.FC<IIconSvg> = ({ fill, className, bgColor, size = '20px' }) => (
  <Svg className={className} fill={fill} color={bgColor} size={size} path="" viewBox="0 0 24 24">
    <mask id="mask0_1322_3142" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_1322_3142)">
      <path d="M5 20V13H3V11H9V13H7V20H5ZM5 9V4H7V9H5ZM9 9V7H11V4H13V7H15V9H9ZM11 20V11H13V20H11ZM17 20V17H15V15H21V17H19V20H17ZM17 13V4H19V13H17Z" />
    </g>
  </Svg>
);

export default Filter;
