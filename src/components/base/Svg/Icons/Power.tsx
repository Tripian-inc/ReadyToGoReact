import React from 'react';

type Props = {
  className?: string;
  width?: string;
  height?: string;
};

const PowerIcon: React.FC<Props> = ({ className, width = '24', height = '24' }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default PowerIcon;
