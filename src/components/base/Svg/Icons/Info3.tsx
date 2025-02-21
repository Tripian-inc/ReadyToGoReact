import React from 'react';

type Props = {
  className?: string;
  width?: string;
  height?: string;
};

const Info3Icon: React.FC<Props> = ({ className, width = '24', height = '24' }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default Info3Icon;
