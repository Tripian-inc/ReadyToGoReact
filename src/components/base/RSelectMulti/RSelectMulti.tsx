import React, { useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { helper } from '@tripian/model';
import ReactSelect, { InputActionMeta, SingleValue, MultiValue } from 'react-select';
import { RSelectOption } from '../RSelect/RSelect';
// import './RSelectMulti.scss'; // duplica global

interface IRSelectMulti {
  options: RSelectOption[];
  selectedOptionValues: string[];
  onSelectedOptionChange: (selectedOptions: RSelectOption[]) => void;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  placeHolder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const RSelectMulti: React.FC<IRSelectMulti> = ({ options, selectedOptionValues, onSelectedOptionChange, onInputChange, placeHolder = 'Please select', disabled = false, onFocus, onBlur }) => {
  const selectedOptions = useMemo(() => options.filter((option) => selectedOptionValues.includes(option.value)), [selectedOptionValues, options]);

  const handleChange = (newSelectedOptions: MultiValue<RSelectOption> | SingleValue<RSelectOption>) => {
    onSelectedOptionChange(newSelectedOptions as RSelectOption[]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customFilter = (option: { label: string; value: string; data: any }, searchText: string) => helper.toEngChars(option.label).toLowerCase().includes(helper.toEngChars(searchText).toLowerCase());

  return (
    <>
      <ReactSelect
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        onInputChange={onInputChange}
        filterOption={customFilter}
        placeholder={placeHolder}
        className="trpReactSelect"
        classNamePrefix="trpReactSelect"
        isDisabled={disabled}
        isClearable={false}
        // isOptionDisabled={(option) => option.isSelected === true}
        // isOptionSelected={(option) => option.isSelected === true}
        onFocus={() => onFocus && onFocus()}
        onBlur={() => onBlur && onBlur()}
      />
    </>
  );
};

export default RSelectMulti;
