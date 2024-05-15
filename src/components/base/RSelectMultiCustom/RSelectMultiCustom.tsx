/* eslint-disable prefer-const */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useRef, useMemo } from 'react';
import Select, { components, InputAction, MultiValue, OptionProps, ValueContainerProps } from 'react-select';
import { RSelectOption } from '../RSelect/RSelect';
import classes from './RSelectMultiCustom.scss';
import { Filter } from '../Svg/Icons';

interface IRSelectMultiCustom {
  options: RSelectOption[];
  selectedOptionValues: string[];
  onSelectedOptionChange: (selectedOptions: RSelectOption[]) => void;
  isSelectAll: boolean;
  // onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  placeHolder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ValueContainer = ({ children, ...props }: ValueContainerProps<RSelectOption>) => {
  let [values, input] = children as any;

  if (Array.isArray(values)) {
    const val = (i: number) => values[i].props.children;
    const { length } = values;

    if (length > 1) {
      const otherCount = length - 1;
      values = `${val(0)}, +${otherCount}`;
    } else {
      values = val(0);
    }
  }

  return (
    <components.ValueContainer {...props}>
      <div className={classes.customContainer}>
        <Filter className="mr2" fill="#000" />
        {values}
        {input}
      </div>
    </components.ValueContainer>
  );
};

const RSelectMultiCustom: React.FC<IRSelectMultiCustom> = ({ options, selectedOptionValues, onSelectedOptionChange, isSelectAll, /* onInputChange */ placeHolder = '', disabled = false, onFocus, onBlur }) => {
  const [selectInput, setSelectInput] = useState<string>('');
  const isAllSelected = useRef<boolean>(false);
  const allOption = { value: '*', label: 'All' };

  const comparator = (v1: RSelectOption, v2: RSelectOption) => Number(v1.value) - Number(v2.value);

  const selectedOptions = useMemo(() => options.filter((option) => selectedOptionValues.includes(option.value)), [selectedOptionValues, options]);

  const filterOptions = (opts: RSelectOption[], input: string) => opts?.filter(({ label }: RSelectOption) => label.toLowerCase().includes(input.toLowerCase()));
  const filteredOptions = filterOptions(options, selectInput);
  const filteredSelectedOptions = filterOptions(selectedOptions, selectInput);

  const Option = ({ children, ...props }: OptionProps<RSelectOption>) => (
    <components.Option {...props}>
      <div className={classes.customContainer}>
        <input type="checkbox" checked={props.isSelected || isAllSelected.current} className={classes.checkbox} onChange={() => {}} />
        {children}
      </div>
    </components.Option>
  );

  const customFilterOption = ({ value, label }: RSelectOption, input: string) => (value !== '*' && label.toLowerCase().includes(input.toLowerCase())) || (value === '*' && filteredOptions?.length > 0);

  const onInputChange = (inputValue: string, event: { action: InputAction }) => {
    if (event.action === 'input-change') setSelectInput(inputValue);
    else if (event.action === 'menu-close' && selectInput !== '') setSelectInput('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.key === ' ' || e.key === 'Enter') && !selectInput) e.preventDefault();
  };

  const handleChange = (newSelectedOptions: MultiValue<RSelectOption>) => {
    if (
      newSelectedOptions.length > 0 &&
      !isAllSelected.current &&
      (newSelectedOptions[newSelectedOptions.length - 1].value === allOption.value || JSON.stringify(filteredOptions) === JSON.stringify((newSelectedOptions as RSelectOption[]).sort(comparator)))
    )
      return onSelectedOptionChange(
        [...(selectedOptions ?? []), ...options.filter(({ label }: RSelectOption) => label.toLowerCase().includes(selectInput?.toLowerCase()) && (selectedOptions ?? []).filter((opt: RSelectOption) => opt.label === label).length === 0)].sort(
          comparator,
        ),
      );
    if (newSelectedOptions.length > 0 && newSelectedOptions[newSelectedOptions.length - 1].value !== allOption.value && JSON.stringify((newSelectedOptions as RSelectOption[]).sort(comparator)) !== JSON.stringify(filteredOptions))
      return onSelectedOptionChange(newSelectedOptions as RSelectOption[]);
    return onSelectedOptionChange([...selectedOptions?.filter(({ label }: RSelectOption) => !label.toLowerCase().includes(selectInput?.toLowerCase()))]);
  };

  if (isSelectAll && options.length !== 0) {
    isAllSelected.current = JSON.stringify(filteredSelectedOptions) === JSON.stringify(filteredOptions);

    return (
      <Select
        value={selectedOptions}
        onChange={handleChange}
        onInputChange={onInputChange}
        options={[allOption, ...options]}
        filterOption={customFilterOption}
        isMulti
        isSearchable={false}
        placeholder={placeHolder}
        isDisabled={disabled}
        isClearable={false}
        className="trpReactSelectMulti"
        classNamePrefix="trpReactSelectMulti"
        closeMenuOnSelect={false}
        components={{
          ValueContainer,
          Option,
        }}
        onFocus={() => onFocus && onFocus()}
        onBlur={() => onBlur && onBlur()}
        inputValue={selectInput}
        onKeyDown={onKeyDown}
        tabSelectsValue={false}
        backspaceRemovesValue={false}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
      />
    );
  }

  return (
    <Select
      inputValue={selectInput}
      onInputChange={onInputChange}
      filterOption={customFilterOption}
      components={{
        ValueContainer,
      }}
      onKeyDown={onKeyDown}
      tabSelectsValue={false}
      hideSelectedOptions
      backspaceRemovesValue={false}
      blurInputOnSelect
    />
  );
};

export default RSelectMultiCustom;
