import React, { useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { helper } from '@tripian/model';
import ReactSelect, { InputActionMeta, SingleValue, MultiValue } from 'react-select';
import './RSelect.scss';

export type RSelectOption = {
  value: string;
  label: string;
};

interface IRSelect {
  options: RSelectOption[];
  selectedOptionValue?: string;
  onSelectedOptionChange: (selectedOption: RSelectOption) => void;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  placeHolder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const RSelect: React.FC<IRSelect> = ({ options, selectedOptionValue, onSelectedOptionChange, onInputChange, placeHolder = 'Please select', disabled = false, onFocus, onBlur }) => {
  const selectedOption = useMemo(() => options.find((option) => option.value === selectedOptionValue), [selectedOptionValue, options]);

  const handleChange = (newSelectedOption: MultiValue<RSelectOption> | SingleValue<RSelectOption>) => {
    onSelectedOptionChange(newSelectedOption as RSelectOption);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customFilter = (option: { label: string; value: string; data: any }, searchText: string) => helper.toEngChars(option.label).toLowerCase().includes(helper.toEngChars(searchText).toLowerCase());

  return (
    <>
      <ReactSelect
        options={options}
        defaultValue={selectedOption}
        onChange={handleChange}
        onInputChange={onInputChange}
        filterOption={customFilter}
        placeholder={placeHolder}
        className="trpReactSelect"
        classNamePrefix="trpReactSelect"
        isDisabled={disabled}
        isOptionDisabled={(option) => option.value === selectedOption?.value}
        isOptionSelected={(option) => option.value === selectedOption?.value}
        onFocus={() => onFocus && onFocus()}
        onBlur={() => onBlur && onBlur()}
      />
    </>
  );
};

export default RSelect;
