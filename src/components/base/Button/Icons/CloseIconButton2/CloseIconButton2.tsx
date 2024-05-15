import React from 'react';
import classes from './CloseIconButton2.scss';

interface ICloseIconButton {
  clicked: () => void;
  fill: string;
  rounded?: boolean;
}

const CloseIconButton2: React.FC<ICloseIconButton> = ({ clicked, fill, rounded = false }) => (
  <>
    <div
      className={`${rounded ? classes.closeIconButtonRounded : classes.closeIconButton}`}
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.stopPropagation();
        clicked();
      }}
      onKeyDown={() => {}}
    >
      <svg viewBox="0 0 34 34" fill={fill} className="close_svg">
        <path
          d="M20.7123 21.7729L12.227 13.2876C11.9371 12.9977 11.9371 12.5169 12.227 12.227C12.5169 11.9371 12.9977 11.9371 13.2877 12.227L21.7729 20.7123C22.0628 21.0022 22.0628 21.483 21.7729 21.7729C21.483 22.0628 21.0022 22.0628 20.7123 21.7729Z"
          fill="#2B2B33"
        />
        <path
          d="M12.2271 21.7729C11.9372 21.483 11.9372 21.0022 12.2271 20.7123L20.7123 12.227C21.0023 11.9371 21.4831 11.9371 21.773 12.227C22.0629 12.5169 22.0629 12.9977 21.773 13.2876L13.2877 21.7729C12.9978 22.0628 12.517 22.0628 12.2271 21.7729Z"
          fill="#2B2B33"
        />
      </svg>
    </div>
  </>
);

export default CloseIconButton2;
