import React from 'react';
import { IButtonIcons } from './IButtonIcons';
import Button from '../Button';

const Base = (svgIconPath: string, iconViewBox?: string, svgIconPath2?: string) => {
  const genericIconComponent: React.FC<IButtonIcons> = ({ type, size, color, text, style, className, iconPosition, iconSize, onClick, disabled }) => (
    <Button
      disabled={disabled}
      type={type}
      size={size}
      color={color}
      text={text}
      style={style}
      className={className}
      iconPosition={iconPosition}
      iconPath={svgIconPath}
      iconPath2={svgIconPath2}
      iconSize={iconSize}
      iconViewBox={iconViewBox}
      onClick={onClick}
    />
  );
  return genericIconComponent;
};

export default Base;
