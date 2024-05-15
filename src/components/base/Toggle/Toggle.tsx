/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classes from './Toggle.scss';

interface IToggle {
  checked: boolean;
  onChange: (checked: boolean) => void;
  domId?: string;
}

const Toggle: React.FC<IToggle> = ({ checked, onChange, domId }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    e.preventDefault();
    onChange(checked);
  };

  return (
    <div className={classes.toggleSwitch}>
      <input
        type="checkbox"
        className={classes.toggleSwitchCheckbox}
        id={domId}
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <label className={classes.toggleSwitchLabel} onKeyDown={(e) => handleKeyPress(e)} htmlFor={domId}>
        <span className={classes.toggleSwitchInner} />
        <span className={classes.toggleSwitchSwitch} />
      </label>
    </div>
  );
};

export default Toggle;
