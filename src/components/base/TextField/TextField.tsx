import React from 'react';
import classes from './TextField.scss';

interface ITextField {
  id?: string;
  className?: string;
  name: string;
  value: string | number;
  size?: 'small' | 'large' | 'default';
  style?: React.CSSProperties;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  placeholder?: string;
  autocomplete?: string;
  children?: React.ReactNode;
}

const TextField: React.FC<ITextField> = ({ id, className, name, value, size = 'default', style = {}, onChange, onKeyDown, type = 'text', min, max, disabled, placeholder, autocomplete, children }) => {
  const inputClasses = [className, classes.inputBase];
  if (size === 'small') {
    inputClasses.push(classes.small);
  } else if (size === 'large') {
    inputClasses.push(classes.large);
  } else {
    inputClasses.push(classes.default);
  }
  return (
    <div className={classes.inputBaseRoot} style={{ ...style }}>
      <input id={id} autoComplete={autocomplete} type={type} placeholder={placeholder} onKeyDown={onKeyDown} name={name} min={min} max={max} disabled={disabled} className={inputClasses.join(' ')} value={value} onChange={onChange} />
      {children}
    </div>
  );
};

export default TextField;
