/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import classes from './SwitchOld.scss';

interface ISwitchOld {
  onchange: (value: boolean) => void;
  label?: string;
  value?: boolean;
}

const SwitchOld: React.FC<ISwitchOld> = ({ onchange, label, value = false }) => {
  const [action, setAction] = useState<boolean>(value);

  const handleChange = () => {
    setAction(!action);
    onchange(!action);
  };

  return (
    <label className={classes.content} htmlFor="switch">
      <div>Manual Sort</div>
      <span className={classes.switch}>
        <input type="checkbox" id="switch" checked={action} onChange={handleChange} />
        <span className={classes.toggle} />
      </span>
    </label>
  );
};

export default SwitchOld;
