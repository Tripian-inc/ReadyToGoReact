/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classes from './EyeIconButton.scss';

interface IEyeIconButton {
  clicked: () => void;
  show: boolean;
}

const EyeIconButton: React.FC<IEyeIconButton> = ({ clicked, show }) => (
  <>
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        clicked();
      }}
      onKeyDown={() => {}}
    >
      <div className={classes.eyeIconButtonWrapper}>
        <svg viewBox="0 0 512 512" className={classes.eyeIconSvg} width="2.5rem" height="2.5rem">
          {show ? (
            <g>
              <path d="M261.2,193.4c-46.4,0-86.8,25.2-108.5,62.6c21.7,37.4,62.1,62.6,108.5,62.6c46.4,0,86.8-25.2,108.5-62.6   C348,218.6,307.5,193.4,261.2,193.4z" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" />
              <circle cx="261.2" cy="256" r="37.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" />
              <line fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" x1="152.7" x2="369.6" y1="348.5" y2="170" />
            </g>
          ) : (
            <g>
              <path d="M256,193.4c-46.4,0-86.8,25.2-108.5,62.6c21.7,37.4,62.1,62.6,108.5,62.6c46.4,0,86.8-25.2,108.5-62.6   C342.8,218.6,302.4,193.4,256,193.4z" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" />
              <circle cx="256" cy="256" r="37.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" />
            </g>
          )}
        </svg>
      </div>
    </div>
  </>
);

export default EyeIconButton;
