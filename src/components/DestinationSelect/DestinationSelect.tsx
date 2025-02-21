/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useMemo, useState } from 'react';
import ReactSelect, { SingleValue, MultiValue } from 'react-select';
import { matchSorter } from 'match-sorter';
import Model from '@tripian/model';
import { Distance } from '../base/Svg/Icons';
import classes from './DestinationSelect.scss';

export type RSelectOption = {
  id: number;
  label: string;
  payload: { destinationId: number; destinationName: string; coordinate: Model.Coordinate; parentName: string };
  isSelected?: boolean;
};

interface IDestinationSelect {
  options: RSelectOption[];
  selectedOptionId?: number;
  onSelectedOptionChange: (selectedOption: RSelectOption) => void;
  placeHolder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const DestinationSelect: React.FC<IDestinationSelect> = ({ options, selectedOptionId, onSelectedOptionChange, placeHolder = 'Please select', disabled = false, onFocus, onBlur }) => {
  const selectedOption = useMemo(() => options.find((option) => option.id === selectedOptionId), [selectedOptionId, options]);
  const [destinationSearchInput, setDestinationSearchInput] = useState<string>('');

  const handleChange = (newSelectedOption: MultiValue<RSelectOption> | SingleValue<RSelectOption>) => {
    onSelectedOptionChange(newSelectedOption as RSelectOption);
  };

  /*  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customFilter = (option: { label: string; value: string; data: any }, searchText: string) => helper.toEngChars(option.label).toLowerCase().includes(helper.toEngChars(searchText).toLowerCase());
 */
  const noOptionsMessage = (obj: { inputValue: string }) => {
    if (obj.inputValue.length > 2) {
      return <span>No Destination Found.</span>;
    }
    return null;
  };

  const formatOptionLabel = (option: RSelectOption) => (
    <>
      {option.payload && (
        <div className={classes.optionLabel}>
          <Distance size="2rem" fill="#000" />
          <div className={classes.optionLabelText}>
            <div>{option.payload?.destinationName}</div>
            <div>{option.payload.parentName}</div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <ReactSelect
        options={matchSorter(options, destinationSearchInput, { keys: ['label'] })}
        defaultValue={selectedOption}
        onChange={handleChange}
        onInputChange={(e) => setDestinationSearchInput(e)}
        /* filterOption={customFilter} */
        placeholder={placeHolder}
        className="destinationSelect"
        classNamePrefix="destinationSelect"
        isDisabled={disabled}
        isOptionDisabled={(option) => option.isSelected === true}
        isOptionSelected={(option) => option.isSelected === true}
        onFocus={() => onFocus && onFocus()}
        onBlur={() => onBlur && onBlur()}
        noOptionsMessage={noOptionsMessage}
        formatOptionLabel={formatOptionLabel}
      />
    </>
  );
};

export default DestinationSelect;
