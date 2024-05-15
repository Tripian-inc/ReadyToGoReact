const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, handleClick: (event: React.KeyboardEvent<HTMLInputElement>) => void) => {
  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault();
    event.stopPropagation();
    handleClick(event);
  }
};

export default handleOnKeyDown;
