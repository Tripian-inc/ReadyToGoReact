import React, { useMemo } from 'react';
import { RadioButtonChecked, RadioButtonUnChecked } from '../../Svg/Icons/RadioButton';
import classes from './RadioButton.scss';

interface IRadioButton {
  domId?: string;
  text: string | React.ReactNode;
  style?: React.CSSProperties;
  checked: boolean;
  onChange: (checked: boolean, value: string) => void;
}

const RadioButton: React.FC<IRadioButton> = ({ domId, text, style, checked, onChange }) => {
  const handleRadioButtonSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked, event.target.name);
  };

  const svg = checked ? <RadioButtonChecked className={classes.checked} size="1.25rem" /> : <RadioButtonUnChecked size="1.25rem" />;

  const memoizedUniqueDomId = useMemo(() => `dropdown${Math.random()}`, []);

  return (
    <label className={classes.radioButton} htmlFor={memoizedUniqueDomId} style={style}>
      <span className={classes.span1}>
        <input id={memoizedUniqueDomId} name={domId} checked={checked} type="checkbox" onChange={handleRadioButtonSelectedChange} />
        {svg}
      </span>
      <span className={classes.span2}>{text}</span>
    </label>
  );
};

export default RadioButton;
