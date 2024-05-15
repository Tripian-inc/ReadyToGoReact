import React, { useState, useEffect } from 'react';
import handleOnChange from '../../../handlers/handleOnChange';

import TextField from '../TextField/TextField';

interface INumberInput {
  defaultValue?: number;
  minValue: number;
  maxValue: number;
  placeholder?: string;
  onchange: (num: number | null) => void;
}

const NumberInput: React.FC<INumberInput> = ({ defaultValue, minValue, maxValue, placeholder, onchange }) => {
  const [number, setNumber] = useState<number | undefined>();

  useEffect(() => {
    setNumber(defaultValue);
  }, [defaultValue]);

  const numberInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(event, setNumber);

    const newValue = event.target.value;
    const newValueInt = Number(event.target.value);

    if (newValue) {
      if (newValueInt < minValue && newValue !== '') {
        setNumber(minValue);
        onchange(minValue);
      } else if (newValueInt <= maxValue) {
        setNumber(newValueInt);
        onchange(newValueInt);
      } else {
        setNumber(number);
      }
    } else {
      onchange(null);
    }
  };

  return (
    <TextField
      name="numberInput"
      type="number"
      value={number || ''}
      placeholder={placeholder}
      min={minValue}
      max={maxValue}
      onChange={numberInputOnChange}
      onKeyDown={(event) => ((event.which !== 8 && event.which !== 0 && event.which < 48) || event.which > 57) && event.preventDefault()}
    />
  );
};

export default NumberInput;
