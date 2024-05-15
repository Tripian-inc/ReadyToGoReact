/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { helper } from '@tripian/model';
import { matchSorter } from 'match-sorter';
import CreatableSelect from 'react-select/creatable';
import { MultiValue, SingleValue, ValueContainerProps, components } from 'react-select';
import { RSelectOption } from '../base/RSelect/RSelect';
import classes from './PoiSearchAutoComplete.scss';

interface IPoiSearchAutoComplete {
  inputValue: string;
  options: RSelectOption[];
  selectedOptionValues: string[];
  onSelectedOptionChange: (selectedOptions: RSelectOption[]) => void;
  onInputChange?: (input: string) => void;
  onCreateOption: (input: string) => void;
  placeHolder?: string;
  isDisabled?: boolean;
}

const PoiSearchAutoComplete: React.FC<IPoiSearchAutoComplete> = ({ inputValue, options, selectedOptionValues, onSelectedOptionChange, onInputChange, onCreateOption, placeHolder, isDisabled = false }) => {
  const selectedOptions = useMemo(() => options.filter((option) => selectedOptionValues.includes(option.value)), [selectedOptionValues, options]);

  const handleChange = (newSelectedOptions: MultiValue<RSelectOption> | SingleValue<RSelectOption>) => {
    onSelectedOptionChange(newSelectedOptions as RSelectOption[]);
  };

  /*   const customFilter = (option: { label: string; value: string; data: any }, searchText: string) => helper.toEngChars(option.label).toLowerCase().includes(helper.toEngChars(searchText).toLowerCase()); */

  /* const ValueContainer = ({ children, ...props }: ValueContainerProps<RSelectOption>) => {
    const [values, input] = children as any;

    return (
      <components.ValueContainer {...props}>
        <div className={classes.customContainer}>{input}</div>
      </components.ValueContainer>
    );
  };

  const Input = (props: any) => <components.Input {...props} autoComplete="off" placeholder={placeHolder} />; */

  return (
    <div className={classes.poiSearchAutoComplete}>
      <CreatableSelect
        className="trpReactCreatableSelectMulti"
        classNamePrefix="trpReactCreatableSelectMulti"
        onCreateOption={onCreateOption}
        isMulti
        options={
          inputValue !== ''
            ? [{ label: inputValue, value: inputValue }, ...matchSorter(options, inputValue, { keys: ['label'] })].filter(
                (option, index, self) => option.label !== '' && index === self.findIndex((t) => Object.keys(option).every(() => option.label === t.label)),
              )
            : options
        }
        value={selectedOptions}
        /* filterOption={customFilter} */
        isClearable={false}
        isSearchable
        onChange={handleChange}
        controlShouldRenderValue={false}
        inputValue={inputValue}
        placeholder={placeHolder}
        onInputChange={onInputChange}
        /* components={{ ValueContainer, Input }} */
        formatCreateLabel={(userInput) => userInput}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default PoiSearchAutoComplete;
