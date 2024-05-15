// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import classes from './Dropdown.scss';

interface IOptions {
  key?: string | number;
  value: string | number;
  label?: string | number;
}

interface IDropdown {
  id?: string;
  options: Array<IOptions>;
  defaultValue: string | number | undefined;
  selectChange: (value: string | number, index: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  skippable?: boolean;
  disabled?: boolean;
}

const Dropdown: React.FC<IDropdown> = ({ id, options, defaultValue, selectChange, onFocus, onBlur, skippable = false, disabled = false }) => {
  const [selection, setSelection] = useState<string | number | undefined>(defaultValue);

  const keyOptions = options.map((o) => ({
    key: o.key || o.value,
    value: o.value,
    label: o.label,
  }));

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedIndex = options.findIndex((option) => option.value === selectedValue);

    setSelection(event.target.value);
    selectChange(event.target.value, selectedIndex);
  };

  return (
    <div className={classes.custom_select}>
      <select
        id={id}
        className={classes.select}
        value={selection}
        onChange={handleChange}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          if (onBlur) onBlur();
        }}
        disabled={disabled}
      >
        {skippable && <option value={undefined}>Please Select</option>}
        {keyOptions.map((option) => (
          <option key={option.key} value={option.value}>
            {option.label ? option.label : option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
