import React from 'react';
import IIconSvg from './IIconSvg';

const ChevronDown: React.FC<IIconSvg> = ({ fill = 'none', size = '24', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default ChevronDown;
