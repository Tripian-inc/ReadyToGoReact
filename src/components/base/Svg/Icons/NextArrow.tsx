import React from 'react';
import Svg from '../Svg';

interface INextArrow {
  fill?: string;
  bgColor?: string;
  size?: string;
}

const NextArrow: React.FC<INextArrow> = ({ fill, bgColor, size }) => (
  <div style={{ width: '100%', outline: '0', textAlign: 'center', display: 'flex' }}>
    <Svg
      fill={fill}
      bgColor={bgColor}
      size={size}
      path="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M335.083,271.083
        L228.416,377.749c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251c-8.341-8.341-8.341-21.824,0-30.165
        L289.835,256l-91.584-91.584c-8.341-8.341-8.341-21.824,0-30.165s21.824-8.341,30.165,0l106.667,106.667
        C343.424,249.259,343.424,262.741,335.083,271.083z"
      viewBox="0 0 512 512"
    />
  </div>
);

export default NextArrow;
