import React from 'react';
import Svg from '../Svg';

interface ILandingProfile {
  fill?: string;
  color?: string;
  size?: string;
}

const LandingProfile: React.FC<ILandingProfile> = ({ fill, color, size = '32px' }) => (
  <Svg fill={fill} color={color} size={size} path="" viewBox="0 0 129 129">
    <path d="m64.3,71.6c18,0 32.6-14.6 32.6-32.6s-14.6-32.5-32.6-32.5-32.6,14.6-32.6,32.5 14.6,32.6 32.6,32.6zm0-56.6c13.2,0 24,10.8 24,24s-10.8,24-24,24-24-10.8-24-24 10.8-24 24-24z" />
    <path d="m7.9,122.5h113.2c2.4,0 4.3-1.9 4.3-4.3 0-22.5-18.3-40.9-40.9-40.9h-40c-22.5,0-40.9,18.3-40.9,40.9-1.33227e-15,2.4 1.9,4.3 4.3,4.3zm36.6-36.6h40c16.4,0 29.9,12.2 32,28h-104c2.1-15.7 15.6-28 32-28z" />
  </Svg>
);

export default LandingProfile;
