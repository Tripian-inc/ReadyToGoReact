import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Exclamation2: React.FC<IIconSvg> = ({ fill, bgColor, size }) => (
  <Svg fill={fill} bgColor={bgColor} size={size} viewBox="0 0 48 48">
    <g id="Layer_2" data-name="Layer 2">
      <g id="invisible_box" data-name="invisible box">
        <rect width="48" height="48" fill="none" />
      </g>
      <g id="icons_Q2" data-name="icons Q2">
        <g>
          <circle cx="24" cy="40" r="3" />
          <path d="M23.8,33h.4a2.2,2.2,0,0,0,2.1-2L28,7.3a4,4,0,1,0-8,0L21.7,31A2.2,2.2,0,0,0,23.8,33Z" />
        </g>
      </g>
    </g>
  </Svg>
);

export default Exclamation2;
