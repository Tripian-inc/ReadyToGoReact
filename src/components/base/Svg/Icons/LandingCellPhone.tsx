import React from 'react';
import Svg from '../Svg';

interface ILandingCellPhone {
  fill?: string;
  color?: string;
  size?: string;
}

const LandingCellPhone: React.FC<ILandingCellPhone> = ({ fill, color, size = '32px' }) => (
  <Svg
    fill={fill}
    color={color}
    size={size}
    path="M16,18H7V4H16M11.5,22A1.5,1.5 0 0,1 10,20.5A1.5,1.5 0 0,1 11.5,19A1.5,1.5 0 0,1 13,20.5A1.5,1.5 0 0,1 11.5,22M15.5,1H7.5A2.5,2.5 0 0,0 5,3.5V20.5A2.5,2.5 0 0,0 7.5,23H15.5A2.5,2.5 0 0,0 18,20.5V3.5A2.5,2.5 0 0,0 15.5,1Z"
    viewBox="0 0 24 24"
  />
);

export default LandingCellPhone;
