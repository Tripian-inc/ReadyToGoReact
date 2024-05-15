/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classes from './ArrowLeftButton.scss';

interface IArrowLeftButton {
  clicked: () => void;
  fill?: string;
}

const ArrowLeftButton: React.FC<IArrowLeftButton> = ({ clicked, fill = '#000' }) => (
  <>
    <div
      className={classes.arrowLeftButton}
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.stopPropagation();
        clicked();
      }}
      onKeyDown={() => {}}
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M9.56994 18.82C9.37994 18.82 9.18994 18.75 9.03994 18.6L2.96994 12.53C2.67994 12.24 2.67994 11.76 2.96994 11.47L9.03994 5.4C9.32994 5.11 9.80994 5.11 10.0999 5.4C10.3899 5.69 10.3899 6.17 10.0999 6.46L4.55994 12L10.0999 17.54C10.3899 17.83 10.3899 18.31 10.0999 18.6C9.95994 18.75 9.75994 18.82 9.56994 18.82Z"
          fill={fill}
        />
        <path d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z" fill={fill} />
      </svg>
    </div>
  </>
);

export default ArrowLeftButton;
