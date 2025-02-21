import React from 'react';

type Props = {
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
};

const EuroIcon: React.FC<Props> = ({ className, width = '24', height = '24', fill = '#000' }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h12" />
    <path d="M4 14h9" />
    <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
  </svg>
);

export default EuroIcon;
