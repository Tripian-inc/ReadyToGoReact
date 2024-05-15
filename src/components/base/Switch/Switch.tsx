/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classes from './Switch.scss';
import SwitchIcon from '../Svg/Icons/SwitchIcon/SwitchIcon';
import Button from '../Button/Button';
import BUTTON_TYPES from '../Button/ButtonTypes';

interface ISwitch {
  onchange: (value: boolean) => void;
  value?: boolean;
}

const Switch: React.FC<ISwitch> = ({ onchange, value = false }) => {
  // const [action, setAction] = useState<boolean>(value);

  if (value) {
    return (
      <Button
        text="DONE"
        color="default"
        style={{ fontWeight: 'bold' }}
        type={BUTTON_TYPES.OUTLINED}
        onClick={() => {
          onchange(false);
        }}
      />
    );
  }

  return (
    <div className={classes.switchDiv}>
      <SwitchIcon
        onClick={() => {
          onchange(true);
        }}
      />
    </div>
  );
};

export default Switch;
