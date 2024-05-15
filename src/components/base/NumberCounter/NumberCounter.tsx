import React, { useState } from 'react';
import Button from '../Button/Button';
import BUTTON_TYPES from '../Button/ButtonTypes';
import classes from './NumberCounter.scss';

interface INumberCounter {
  defaultValue?: number;
  minValue: number;
  maxValue: number;
  onchange: (num: number) => void;
  iconFill?: string;
}

const NumberCounter: React.FC<INumberCounter> = ({ defaultValue = 0, minValue, maxValue, onchange, iconFill }) => {
  const [number, setNumber] = useState<number>(defaultValue);

  const numberInputOnChange = (action: string) => {
    switch (action) {
      case 'increment':
        setNumber(number + 1);
        onchange(number + 1);
        break;
      case 'decrement':
        setNumber(number - 1);
        onchange(number - 1);
        break;
      default:
        throw new Error();
    }
  };

  return (
    <>
      <div className={classes.numberInput}>
        <Button
          type={BUTTON_TYPES.TEXT}
          iconPath="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M255,459
        c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z M153,280.5h204v-51H153V280.5z "
          iconSize="1.8em"
          iconViewBox="0 0 510 510"
          iconFill={iconFill}
          disabled={number === minValue}
          onClick={() => {
            numberInputOnChange('decrement');
          }}
        />
        <span>{number}</span>
        <Button
          iconFill={iconFill}
          type={BUTTON_TYPES.TEXT}
          iconPath="M280.5,153h-51v76.5H153v51h76.5V357h51v-76.5H357v-51h-76.5V153z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255
        s255-114.75,255-255S395.25,0,255,0z M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z"
          iconViewBox="0 0 510 510"
          iconSize="1.8em"
          disabled={number === maxValue}
          onClick={() => {
            numberInputOnChange('increment');
          }}
        />
      </div>
    </>
  );
};

export default NumberCounter;
