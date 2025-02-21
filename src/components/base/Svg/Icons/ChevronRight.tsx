import React from 'react';
import IIconSvg from './IIconSvg';

const ChevronRight: React.FC<IIconSvg> = ({ fill = 'none', size = '24', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default ChevronRight;
