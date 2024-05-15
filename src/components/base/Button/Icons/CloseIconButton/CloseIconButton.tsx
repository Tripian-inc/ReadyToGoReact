/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './CloseIconButton.scss';

interface ICloseIconButton {
  clicked: () => void;
  fill: string;
  className?: string;
}

const CloseIconButton: React.FC<ICloseIconButton> = ({ clicked, fill, className }) => (
  <div className={className}>
    <div
      className="close_icon_button"
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.stopPropagation();
        clicked();
      }}
      onKeyDown={() => {}}
    >
      <div className="close_icon_button_content">
        <div className="close_svg_wrapper">
          <svg viewBox="0 0 24 24" fill={fill} className="close_svg">
            <g>
              <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default CloseIconButton;
