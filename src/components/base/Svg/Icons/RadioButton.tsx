import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

export const RadioButtonChecked: React.FC<IIconSvg> = ({ fill, bgColor, size, className }) => (
  <Svg
    fill={fill}
    bgColor={bgColor}
    className={className}
    viewBox="0 0 510 510"
    size={size}
    path="M255,127.5c-71.4,0-127.5,56.1-127.5,127.5c0,71.4,56.1,127.5,127.5,127.5c71.4,0,127.5-56.1,127.5-127.5    C382.5,183.6,326.4,127.5,255,127.5z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z     M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z"
  />
);

export const RadioButtonUnChecked: React.FC<IIconSvg> = ({ fill, bgColor, size, className }) => (
  <Svg
    fill={fill}
    bgColor={bgColor}
    className={className}
    viewBox="0 0 512 512"
    size={size}
    path="M256,0C114.618,0,0,114.618,0,256s114.618,256,256,256s256-114.618,256-256S397.382,0,256,0z M256,469.333    c-117.818,0-213.333-95.515-213.333-213.333S138.182,42.667,256,42.667S469.333,138.182,469.333,256S373.818,469.333,256,469.333z"
  />
);
