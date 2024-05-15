/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo } from 'react';
import classes from './ToggleSwitch.scss';

interface IToggleSwitch {
  checked: boolean;
  onChange: (checked: boolean) => void;
  optionLabels: string[];
  domId?: string;
}

const ToggleSwitch: React.FC<IToggleSwitch> = ({ checked, onChange, optionLabels, domId = 'switch' }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    e.preventDefault();
    onChange(checked);
  };

  const labelAdjuster = useMemo(() => {
    if (optionLabels.some((option) => option.length > 5)) {
      return classes.longSwitchText;
    }
    return ' ';
  }, [optionLabels]);

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
        <span className={`${classes.toggleSwitchInner} ${labelAdjuster}`} data-yes={optionLabels[0]} data-no={optionLabels[1]} />
        <span className={classes.toggleSwitchSwitch} />
      </label>
    </div>
  );
};

export default ToggleSwitch;
