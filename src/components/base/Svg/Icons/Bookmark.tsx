import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Bookmark: React.FC<IIconSvg> = ({ fill, bgColor, size, className }) => (
  <Svg
    fill={fill}
    bgColor={bgColor}
    size={size}
    className={className}
    viewBox="0 0 24 24"
    path="M3 23V7C3 6.45 3.19583 5.97917 3.5875 5.5875C3.97917 5.19583 4.45 5 5 5H15C15.55 5 16.0208 5.19583 16.4125 5.5875C16.8042 5.97917 17 6.45 17 7V23L10 20L3 23ZM5 19.95L10 17.8L15 19.95V7H5V19.95ZM19 20V3H6V1H19C19.55 1 20.0208 1.19583 20.4125 1.5875C20.8042 1.97917 21 2.45 21 3V20H19Z"
  />
);

export default Bookmark;
