import React from 'react';

type Props = {
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
};

const MapPinIcon: React.FC<Props> = ({ className, width = '24', height = '24', fill = '#000' }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default MapPinIcon;
