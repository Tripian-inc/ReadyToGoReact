import React from 'react';
import Svg from '../Svg';

interface IThumbsUp {
  fill?: string;
  bgColor?: string;
  size?: string;
}

const ThumbsUp: React.FC<IThumbsUp> = ({ fill, bgColor, size }) => (
  <div style={{ width: '100%', outline: '0', textAlign: 'center' }}>
    <Svg
      fill={fill}
      bgColor={bgColor}
      size={size}
      path="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M313.749,347.584
        c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251L176.917,271.083
        c-8.341-8.341-8.341-21.824,0-30.165l106.667-106.667c8.341-8.341,21.824-8.341,30.165,0s8.341,21.824,0,30.165L222.165,256
        L313.749,347.584z"
      viewBox="0 0 512 512"
    />
  </div>
);

export default ThumbsUp;
