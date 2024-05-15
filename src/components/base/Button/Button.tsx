/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-nested-ternary */
import React from 'react';
import styles from './Button.scss';
import Svg from '../Svg/Svg';

import BUTTON_TYPES from './ButtonTypes';

const buttonClassNames = (type: BUTTON_TYPES = BUTTON_TYPES.CONTAINED, size = 'default', color = 'default'): any[] => {
  const classes = [styles.btn];
  // button type
  if (type === BUTTON_TYPES.OUTLINED) {
    classes.push(styles.outlined);
  } else if (type === BUTTON_TYPES.TEXT) {
    classes.push(styles.text);
  } else {
    classes.push(styles.contained);
  }
  // button size
  if (size === 'small') {
    classes.push(styles.small);
  } else if (size === 'large') {
    classes.push(styles.large);
  } else {
    classes.push(styles.default);
  }
  // button color
  if (color === 'primary') {
    classes.push(styles.primary);
  } else if (color === 'secondary') {
    classes.push(styles.secondary);
  } else if (color === 'danger') {
    classes.push(styles.danger);
  } else if (color === 'disabled') {
    classes.push(styles.disabled);
  } else {
    classes.push(styles.default);
  }

  return classes;
};

interface IButton {
  text?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: BUTTON_TYPES;
  size?: 'default' | 'small' | 'large';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'disabled';
  style?: React.CSSProperties;
  className?: string;
  iconPath?: string;
  iconPath2?: string;
  iconPosition?: string;
  iconSize?: string;
  iconViewBox?: string;
  iconFill?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Button: React.FC<IButton> = ({ type, size = 'default', color = 'default', iconPosition = 'start', text, style, className, iconPath, iconPath2, iconSize, iconViewBox, iconFill, disabled, onClick, onFocus, onBlur }) => {
  const classNames = buttonClassNames(type, size, color);
  if (className) classNames.push(className);

  const icon = iconPath && !iconPath2 ? <Svg fill={iconFill} path={iconPath} size={iconSize} viewBox={iconViewBox} /> : iconPath && iconPath2 ? <Svg path={iconPath} path2={iconPath2} size={iconSize} viewBox={iconViewBox} /> : null;

  const childrens: Array<any> = [];
  const btnInlineStyle: any = {
    ...style,
  };

  if (text) {
    if (icon) {
      const iconSpan = (
        <span key={`button_icon_span_${icon.key}`} className={styles.iconStart}>
          {icon}
        </span>
      );

      if (iconPosition === 'end') {
        childrens.push(text);
        childrens.push(iconSpan);
      } else {
        childrens.push(iconSpan);
        childrens.push(text);
      }
    } else {
      childrens.push(text);
    }
  } else if (icon) {
    childrens.push(
      <span key={`button_icon_span_${icon.key}`} className={styles.iconOnly}>
        {icon}
      </span>,
    );
    btnInlineStyle.minWidth = 'initial';
    btnInlineStyle.padding = '.375rem';
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames.join(' ')}
      style={{ ...btnInlineStyle }}
      onClick={onClick}
      onFocus={() => {
        if (onFocus) onFocus();
      }}
      onBlur={() => {
        if (onBlur) onBlur();
      }}
    >
      <span className={styles.btnLabel}>
        {childrens}
        {/* {icon && iPosition === 'start' ? <span className={styles.iconStart}>{icon}</span> : null}
        {text}
        {icon && iPosition === 'end' ? <span className={styles.iconEnd}>{icon}</span> : null} */}
      </span>
    </button>
  );
};

export default Button;
