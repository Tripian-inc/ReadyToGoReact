import React from 'react';

type Props = {
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
};

const Check2Icon: React.FC<Props> = ({ className, width = '24', height = '24', fill = '#000' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default Check2Icon;
