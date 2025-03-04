import React from 'react';
import Svg from '../Svg';

interface IAvatar {
  fill?: string;
  color?: string;
  size?: string;
  className?: string;
}

const Avatar: React.FC<IAvatar> = ({ className, fill, color, size = '20px' }) => (
  <Svg className={className} fill={fill} color={color} size={size} path="" viewBox="0 0 16 16">
    <path d="M8 0.75C5.92893 0.75 4.25 2.42893 4.25 4.5C4.25 6.57107 5.92893 8.25 8 8.25C10.0711 8.25 11.75 6.57107 11.75 4.5C11.75 2.42893 10.0711 0.75 8 0.75Z" fill={fill} />
    <path
      d="M4 10.25C1.92893 10.25 0.25 11.9289 0.25 14V15.1883C0.25 15.9415 0.795884 16.5837 1.53927 16.7051C5.8181 17.4037 10.1819 17.4037 14.4607 16.7051C15.2041 16.5837 15.75 15.9415 15.75 15.1883V14C15.75 11.9289 14.0711 10.25 12 10.25H11.6591C11.4746 10.25 11.2913 10.2792 11.1159 10.3364L10.2504 10.6191C8.78813 11.0965 7.21187 11.0965 5.74959 10.6191L4.88407 10.3364C4.70869 10.2792 4.52536 10.25 4.34087 10.25H4Z"
      fill={fill}
    />
  </Svg>
);

export default Avatar;
