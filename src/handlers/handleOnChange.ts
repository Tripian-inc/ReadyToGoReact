const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<any>>) => {
  const { type, checked, value } = event.target;
  let newValue;
  if (type === 'checkbox') newValue = checked;
  else if (type === 'radio') newValue = true;
  else newValue = value;
  setValue(newValue);
  return newValue;
};

export default handleOnChange;
