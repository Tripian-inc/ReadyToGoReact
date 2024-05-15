import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Distance: React.FC<IIconSvg> = ({ fill, bgColor, size }) => (
  <Svg fill={fill} bgColor={bgColor} size={size} viewBox="0 0 24 25" path="">
    <mask id="mask0_1323_3576" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
      <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_1323_3576)">
      <path d="M12 22.5C10.2333 22.5 8.79167 22.2208 7.675 21.6625C6.55833 21.1042 6 20.3833 6 19.5C6 18.9167 6.24167 18.4083 6.725 17.975C7.20833 17.5417 7.875 17.2 8.725 16.95L9.3 18.85C9.01667 18.9333 8.75833 19.0375 8.525 19.1625C8.29167 19.2875 8.13333 19.4 8.05 19.5C8.26667 19.7667 8.76667 20 9.55 20.2C10.3333 20.4 11.15 20.5 12 20.5C12.85 20.5 13.6708 20.4 14.4625 20.2C15.2542 20 15.7583 19.7667 15.975 19.5C15.8917 19.4 15.7333 19.2875 15.5 19.1625C15.2667 19.0375 15.0083 18.9333 14.725 18.85L15.3 16.95C16.15 17.2 16.8125 17.5417 17.2875 17.975C17.7625 18.4083 18 18.9167 18 19.5C18 20.3833 17.4417 21.1042 16.325 21.6625C15.2083 22.2208 13.7667 22.5 12 22.5ZM12 15.825C12.3 15.275 12.6167 14.7708 12.95 14.3125C13.2833 13.8542 13.6083 13.4167 13.925 13C14.5417 12.2 15.0333 11.4792 15.4 10.8375C15.7667 10.1958 15.95 9.4 15.95 8.45C15.95 7.35 15.5667 6.41667 14.8 5.65C14.0333 4.88333 13.1 4.5 12 4.5C10.9 4.5 9.96667 4.88333 9.2 5.65C8.43333 6.41667 8.05 7.35 8.05 8.45C8.05 9.4 8.23333 10.1958 8.6 10.8375C8.96667 11.4792 9.45833 12.2 10.075 13C10.3917 13.4167 10.7167 13.8542 11.05 14.3125C11.3833 14.7708 11.7 15.275 12 15.825ZM12 19.5C11.8167 19.5 11.65 19.4458 11.5 19.3375C11.35 19.2292 11.2417 19.0833 11.175 18.9C10.7917 17.7167 10.3083 16.725 9.725 15.925C9.14167 15.125 8.575 14.3583 8.025 13.625C7.49167 12.8917 7.02917 12.1333 6.6375 11.35C6.24583 10.5667 6.05 9.6 6.05 8.45C6.05 6.78333 6.625 5.375 7.775 4.225C8.925 3.075 10.3333 2.5 12 2.5C13.6667 2.5 15.075 3.075 16.225 4.225C17.375 5.375 17.95 6.78333 17.95 8.45C17.95 9.6 17.7583 10.5667 17.375 11.35C16.9917 12.1333 16.525 12.8917 15.975 13.625C15.4417 14.3583 14.8792 15.125 14.2875 15.925C13.6958 16.725 13.2083 17.7167 12.825 18.9C12.7583 19.0833 12.65 19.2292 12.5 19.3375C12.35 19.4458 12.1833 19.5 12 19.5ZM12 10.575C12.5833 10.575 13.0833 10.3667 13.5 9.95C13.9167 9.53333 14.125 9.03333 14.125 8.45C14.125 7.86667 13.9167 7.36667 13.5 6.95C13.0833 6.53333 12.5833 6.325 12 6.325C11.4167 6.325 10.9167 6.53333 10.5 6.95C10.0833 7.36667 9.875 7.86667 9.875 8.45C9.875 9.03333 10.0833 9.53333 10.5 9.95C10.9167 10.3667 11.4167 10.575 12 10.575Z" />
    </g>
  </Svg>
);

export default Distance;