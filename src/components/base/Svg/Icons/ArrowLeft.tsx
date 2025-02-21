import React from 'react';

type Props = {
  className?: string;
  width?: string;
  height?: string;
};

const ArrowLeftIcon: React.FC<Props> = ({ className, width = '24', height = '24' }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export default ArrowLeftIcon;
