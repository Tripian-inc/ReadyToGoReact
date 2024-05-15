import React from 'react';
import classes from './Required.scss';

type RequiredProps = {
  customClassName?: string;
};

const Required: React.FC<RequiredProps> = ({ customClassName }) => {
  const className = [classes.requiredContent];
  if (customClassName) className.push(customClassName);

  return (
    <div className={className.join(' ')}>
      <span className={classes.requiredItem}>*</span>
    </div>
  );
};

export default Required;
