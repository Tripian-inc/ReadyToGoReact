import React, { useState } from 'react';
import Button from '../Button/Button';
import BUTTON_TYPES from '../Button/ButtonTypes';
import classes from './NumberCounter.scss';

interface INumberCounter {
  header?: string;
  defaultValue?: number;
  minValue: number;
  maxValue: number;
  onChange: (num: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const NumberCounter: React.FC<INumberCounter> = ({ header, defaultValue = 0, minValue, maxValue, onChange, onFocus, onBlur }) => {
  const [number, setNumber] = useState<number>(defaultValue);

  const numberInputOnChange = (action: string) => {
    switch (action) {
      case 'increment':
        setNumber(number + 1);
        onChange(number + 1);
        break;
      case 'decrement':
        setNumber(number - 1);
        onChange(number - 1);
        break;
      default:
        throw new Error();
    }
  };

  return (
    <div
      className={classes.numberCounter}
      onFocus={() => {
        if (onFocus) onFocus();
      }}
      onBlur={() => {
        if (onBlur) onBlur();
      }}
      onKeyPress={() => {}}
      role="button"
      tabIndex={0}
    >
      {header && <div className={classes.header}>{header}</div>}
      <div className={classes.numberInput}>
        <Button
          type={BUTTON_TYPES.TEXT}
          iconPath="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
          iconSize="1.8em"
          iconViewBox="0 0 24 24"
          disabled={number === minValue}
          onClick={() => {
            numberInputOnChange('decrement');
          }}
        />
        <span className={classes.number}>{number}</span>
        <Button
          type={BUTTON_TYPES.TEXT}
          iconPath="M21 14.875H7C6.52167 14.875 6.125 14.4783 6.125 14C6.125 13.5217 6.52167 13.125 7 13.125H21C21.4783 13.125 21.875 13.5217 21.875 14C21.875 14.4783 21.4783 14.875 21 14.875Z"
          iconPath2="M14 21.875C13.5217 21.875 13.125 21.4783 13.125 21V7C13.125 6.52167 13.5217 6.125 14 6.125C14.4783 6.125 14.875 6.52167 14.875 7V21C14.875 21.4783 14.4783 21.875 14 21.875Z"
          iconViewBox="0 0 28 28"
          iconSize="1.8em"
          disabled={number === maxValue}
          onClick={() => {
            numberInputOnChange('increment');
          }}
        />
      </div>
    </div>
  );
};

export default NumberCounter;
