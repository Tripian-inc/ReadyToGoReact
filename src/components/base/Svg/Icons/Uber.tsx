import React from 'react';
import Svg from '../Svg';

interface IUber {
  fill?: string;
  bgColor?: string;
  size?: string;
}

const Uber: React.FC<IUber> = ({ fill, bgColor, size }) => (
  <Svg
    fill={fill}
    bgColor={bgColor}
    size={size}
    path="M255.6,0C119.856,0,8.752,106.304,0.4,240h175.2v-48c0-8.832,7.168-16,16-16h128c8.832,0,16,7.168,16,16v128 c0,8.832-7.168,16-16,16h-128c-8.832,0-16-7.168-16-16v-48H0.4c8.352,133.696,119.456,240,255.2,240 c141.152,0,256-114.848,256-256S396.752,0,255.6,0z"
    viewBox="0 0 512 512"
  />
);

export default Uber;
