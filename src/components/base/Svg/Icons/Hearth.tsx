import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Hearth: React.FC<IIconSvg> = ({ bgColor, size = '20px' }) => (
  <Svg
    color={bgColor}
    size={size}
    path="M12 21.65C11.69 21.65 11.39 21.61 11.14 21.52C7.32 20.21 1.25 15.56 1.25 8.69C1.25 5.19 4.08 2.35 7.56 2.35C9.25 2.35 10.83 3.01 12 4.19C13.17 3.01 14.75 2.35 16.44 2.35C19.92 2.35 22.75 5.2 22.75 8.69C22.75 15.57 16.68 20.21 12.86 21.52C12.61 21.61 12.31 21.65 12 21.65ZM7.56 3.85C4.91 3.85 2.75 6.02 2.75 8.69C2.75 15.52 9.32 19.32 11.63 20.11C11.81 20.17 12.2 20.17 12.38 20.11C14.68 19.32 21.26 15.53 21.26 8.69C21.26 6.02 19.1 3.85 16.45 3.85C14.93 3.85 13.52 4.56 12.61 5.79C12.33 6.17 11.69 6.17 11.41 5.79C10.48 4.55 9.08 3.85 7.56 3.85Z"
    viewBox="0 0 20 20"
  />
);

export default Hearth;