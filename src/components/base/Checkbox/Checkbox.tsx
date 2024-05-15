// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useMemo } from 'react';

import { CheckboxChecked, CheckboxUnChecked } from '../Svg/Icons/Checkbox';
import classes from './Checkbox.scss';

interface ICheckbox {
  domId: string;
  text: string;
  style?: React.CSSProperties;
  checked: boolean;
  onChange: (checked: boolean, domId: string) => void;
  className?: string;
}

const Checkbox: React.FC<ICheckbox> = ({ domId, text, style, checked, onChange, className }) => {
  const handleCheckboxOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked, event.target.name);
  };

  const svg = checked ? <CheckboxChecked fill="var(--primary-color)" className={classes.checked} /> : <CheckboxUnChecked fill="var(--text-primary-color)" className={className} />;

  const memoizedUniqueDomId = useMemo(() => `checkbox${Math.random()}`, []);

  return (
    <label className={classes.checkbox} htmlFor={memoizedUniqueDomId} style={style}>
      <span className={classes.span1}>
        <input id={memoizedUniqueDomId} name={domId} type="checkbox" checked={checked} onChange={handleCheckboxOnChange} />
        {svg}
      </span>
      <span className={classes.span2}>{text}</span>
    </label>
  );
};

export default Checkbox;
