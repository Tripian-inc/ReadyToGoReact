import BUTTON_TYPES from '../ButtonTypes';

export interface IButtonIcons {
  disabled?: boolean;
  text?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: BUTTON_TYPES;
  size?: 'default' | 'small' | 'large';
  color?: 'default' | 'primary' | 'secondary' | 'danger' | 'disabled';
  style?: React.CSSProperties;
  className?: string;
  iconPosition?: string;
  iconSize?: string;
}
