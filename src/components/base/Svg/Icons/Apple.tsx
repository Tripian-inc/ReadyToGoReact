import React from 'react';
import Svg from '../Svg';

interface IApple {
  fill?: string;
  color?: string;
  size?: string;
}

const Apple: React.FC<IApple> = ({ fill, color, size = '20px' }) => (
  <Svg fill={fill} color={color} size={size} path="" viewBox="0 0 23 23">
    <g clipPath="url(#clip0_205_110)">
      <path d="M15.1261 0C13.9531 0.0811355 12.582 0.831983 11.783 1.80974C11.0542 2.69673 10.4546 4.01415 10.6884 5.29444C11.9701 5.33432 13.2944 4.56559 14.0617 3.57134C14.7796 2.64584 15.3228 1.33667 15.1261 0Z" fill="black" />
      <path
        d="M19.7618 7.38196C18.6356 5.96965 17.0527 5.15004 15.5579 5.15004C13.5845 5.15004 12.7498 6.09479 11.3787 6.09479C9.96506 6.09479 8.89105 5.15279 7.18445 5.15279C5.50811 5.15279 3.72313 6.1773 2.59136 7.92928C1.00027 10.3963 1.27256 15.0348 3.85102 18.9857C4.77376 20.3994 6.00592 21.9891 7.61763 22.0029C9.05195 22.0166 9.45625 21.0829 11.3994 21.0732C13.3425 21.0622 13.7111 22.0152 15.1426 22.0001C16.7557 21.9877 18.0552 20.2261 18.978 18.8124C19.6394 17.7989 19.8856 17.2887 20.3985 16.1446C16.6677 14.724 16.0695 9.4186 19.7618 7.38196Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_205_110">
        <rect width="22.003" height="22.003" fill="white" />
      </clipPath>
    </defs>
  </Svg>
);

export default Apple;
