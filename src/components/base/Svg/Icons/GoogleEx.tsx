import React from 'react';
import Svg from '../Svg';

interface IGoogle {
  fill?: string;
  color?: string;
  size?: string;
}

const Google: React.FC<IGoogle> = ({ fill, color, size = '20px' }) => (
  <Svg fill={fill} color={color} size={size} path="" viewBox="0 0 52 51">
    <rect width="50.3924" height="50.3924" transform="translate(0.828979 0.255676)" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M49.2058 26.0002C49.2058 24.288 49.0521 22.6417 48.7668 21.0612H26.0253V30.4015H39.0204C38.4606 33.4198 36.7594 35.9771 34.2021 37.6893V43.7478H42.0058C46.5716 39.5442 49.2058 33.3539 49.2058 26.0002Z"
      fill="#4285F4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.025 49.5975C32.5445 49.5975 38.0103 47.4353 42.0055 43.7475L34.2018 37.6889C32.0396 39.1377 29.2738 39.9938 26.025 39.9938C19.7359 39.9938 14.4128 35.7463 12.514 30.0389H4.4469V36.295C8.42007 44.1865 16.5859 49.5975 26.025 49.5975Z"
      fill="#34A853"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5143 30.0396C12.0314 28.5908 11.757 27.0433 11.757 25.4518C11.757 23.8603 12.0314 22.3128 12.5143 20.864V14.6079H4.4472C2.81183 17.8676 1.87891 21.5554 1.87891 25.4518C1.87891 29.3481 2.81183 33.0359 4.4472 36.2957L12.5143 30.0396Z"
      fill="#FBBC05"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.025 10.9088C29.5701 10.9088 32.753 12.1271 35.2555 14.5198L42.1811 7.59421C37.9994 3.69786 32.5335 1.30518 26.025 1.30518C16.5859 1.30518 8.42007 6.71616 4.4469 14.6076L12.514 20.8637C14.4128 15.1564 19.7359 10.9088 26.025 10.9088Z"
      fill="#EA4335"
    />
  </Svg>
);

export default Google;
