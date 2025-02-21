import React, { useMemo } from 'react';
import { RadioButtonChecked, RadioButtonUnChecked } from '../../Svg/Icons';
import classes from './RadioButtonBox.scss';

interface IRadioButtonBox {
  domId?: string;
  text: string;
  description: string;
  style?: React.CSSProperties;
  checked: boolean;
  onChange: (checked: boolean, value: string) => void;
}

const RadioButtonBox: React.FC<IRadioButtonBox> = ({ domId, text, description, style, checked, onChange }) => {
  const handleRadioButtonBoxSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked, event.target.name);
  };

  const svg = checked ? <RadioButtonChecked className={classes.checked} size="1.5rem" /> : <RadioButtonUnChecked size="1.5rem" />;

  const memoizedUniqueDomId = useMemo(() => `dropdown${Math.random()}`, []);

  const styles = [classes.radioButtonBox];
  if (checked) styles.push(classes.checked);
  return (
    <label className={styles.join(' ')} htmlFor={memoizedUniqueDomId} style={style}>
      <div className={classes.content}>
        <div className={classes.span2}>
          <div className={classes.text}>{text}</div>
        </div>
        <span className={classes.span1}>
          <input id={memoizedUniqueDomId} name={domId} checked={checked} type="checkbox" onChange={handleRadioButtonBoxSelectedChange} />
          {svg}
        </span>
      </div>
      <div className={classes.description}>{description}</div>
    </label>
  );
};

export default RadioButtonBox;
