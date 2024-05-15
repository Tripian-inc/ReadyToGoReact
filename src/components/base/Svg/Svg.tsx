import React from 'react';
import styles from './Svg.scss';

interface ISvg {
  path?: string;
  path2?: string;
  fill?: string;
  bgColor?: string;
  color?: string;
  size?: string;
  viewBox?: string;
  className?: string;
  children?: React.ReactNode;
}

const Svg: React.FC<ISvg> = ({ path, path2, fill, bgColor, color, size, children, className, viewBox = '0 0 24 24' }) => {
  const style = {
    fill: fill as 'fill',
    fontSize: size as 'fontSize',
    backgroundColor: bgColor as 'backgroundColor',
    color: color as 'color',
  };

  return (
    <svg className={`${styles.svg} ${className || ''}`} style={style} viewBox={viewBox}>
      {path ? <path d={path} /> : null}
      {path2 ? <path d={path2} /> : null}
      {children}
    </svg>
  );
};

export default Svg;
