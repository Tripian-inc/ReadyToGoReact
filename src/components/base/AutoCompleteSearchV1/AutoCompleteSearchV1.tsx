import React, { useState } from 'react';
import TextField from '../TextField/TextField';
import classes from './AutoCompleteSearchV1.scss';

interface IOption {
  id: number;
  name: string;
}

interface IAutoCompleteSearch {
  options: Array<IOption>;
  defaultUserInput?: string;
  selectOption: Function;
}

const AutoCompleteSearchV1: React.FC<IAutoCompleteSearch> = ({ defaultUserInput = '', options, selectOption }) => {
  const [filteredOptions, setFilteredOptions] = useState<Array<IOption>>([]);
  const [activeOption, setActiveOption] = useState<number>(0);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState(defaultUserInput);

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userSelection = event.target.value;
    const newFilteredOptions = options.filter((o: IOption) => o.name.toLowerCase().indexOf(userSelection.toLowerCase()) > -1);

    setFilteredOptions(newFilteredOptions);
    setShowOptions(true);
    setActiveOption(0);
    setUserInput(userSelection);
  };

  const selectOptionClick = (event: any) => {
    setUserInput(event.currentTarget.innerText);
    setShowOptions(false);
    setActiveOption(0);
    selectOption(event.target);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        setUserInput(filteredOptions[activeOption].name);
        setShowOptions(false);
        setActiveOption(0);
        selectOption(filteredOptions[activeOption]);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (activeOption === 0) {
          return;
        }
        setActiveOption(activeOption - 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (activeOption === filteredOptions.length - 1) {
          return;
        }
        setActiveOption(activeOption + 1);
        break;
      case 'Escape':
        break;
      default:
    }
  };

  let optionList;

  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className={classes.search_ul}>
          {filteredOptions.map((option, index) => {
            let liClass = classes.search_li;
            if (index === activeOption) {
              liClass = classes.activeSearch_li;
            }
            return (
              <li className={liClass} key={option.id} value={option.id} onClick={selectOptionClick} onKeyPress={() => {}} role="presentation">
                {option.name}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div>
          <em>No Option!</em>
        </div>
      );
    }
  }

  return (
    <>
      <div className={classes.search}>
        <TextField
          onChange={inputChanged}
          name="autocomplete"
          value={userInput}
          onKeyDown={handleInputKeyDown}
          size="large"
          style={{
            width: '100%',
          }}
        />
        <span className={classes.search_icon} />
      </div>
      {optionList}
    </>
  );
};

export default AutoCompleteSearchV1;
