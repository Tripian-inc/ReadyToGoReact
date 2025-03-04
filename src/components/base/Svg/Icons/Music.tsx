import React from 'react';

type Props = {
  className?: string;
  width?: string;
  height?: string;
};

const MusicIcon: React.FC<Props> = ({ className, width = '24', height = '24' }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export default MusicIcon;
