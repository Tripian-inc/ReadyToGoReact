import React from 'react';

type Props = {
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
};

const XIcon: React.FC<Props> = ({ className, width = '24', height = '24', fill = '#000' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default XIcon;
