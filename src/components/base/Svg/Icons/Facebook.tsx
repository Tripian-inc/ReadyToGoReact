import React from 'react';
import Svg from '../Svg';

interface IFacebook {
  fill?: string;
  color?: string;
  size?: string;
}

const Facebook: React.FC<IFacebook> = ({ fill, color, size = '20px' }) => (
  <Svg fill={fill} color={color} size={size} path="" viewBox="0 0 52 52">
    <rect width="50.3924" height="50.3924" transform="translate(0.828979 0.879059)" fill="#1877F2" />
    <path
      d="M50.1715 26.2222C50.1715 12.8865 39.3608 2.07583 26.0252 2.07583C12.6895 2.07583 1.87878 12.8865 1.87878 26.2222C1.87878 38.2743 10.7088 48.2638 22.2523 50.0752V33.202H16.1214V26.2222H22.2523V20.9025C22.2523 14.8508 25.8572 11.508 31.3727 11.508C34.0145 11.508 36.7778 11.9796 36.7778 11.9796V17.9219H33.733C30.7335 17.9219 29.798 19.7832 29.798 21.6927V26.2222H36.4949L35.4243 33.202H29.798V50.0752C41.3415 48.2638 50.1715 38.2743 50.1715 26.2222Z"
      fill="white"
    />
  </Svg>
);

export default Facebook;
