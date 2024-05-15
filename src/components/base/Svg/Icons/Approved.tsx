import React from 'react';
import Svg from '../Svg';
import IIconSvg from './IIconSvg';

const Approved: React.FC<IIconSvg> = ({ fill, size = '20px' }) => (
  <Svg fill={fill} size={size} path="" viewBox="0 0 52 52">
    <g clipPath="url(#clip0_217_244)">
      <path
        d="M43.775 17.0517C43.6867 15.9366 44.5189 14.9613 45.6339 14.873C46.7494 14.7847 47.7243 15.6169 47.8126 16.7318C47.838 17.0524 47.8508 17.3787 47.8508 17.7017V34.2062C47.7439 36.8931 43.9067 36.8911 43.8006 34.2062V17.7017C43.8005 17.4851 43.7919 17.2663 43.775 17.0517ZM6.13377 36.2314C7.25223 36.2314 8.15886 35.3248 8.15886 34.2063V17.7018C8.15886 13.2353 11.7927 9.60143 16.2592 9.60143H20.3094C22.9963 9.49451 22.9943 5.65725 20.3094 5.55124H16.2592C9.55942 5.55124 4.10867 11.002 4.10867 17.7018V34.2063C4.10867 35.3248 5.01541 36.2314 6.13377 36.2314ZM51.9009 45.8506C51.9009 49.2005 49.1755 51.9259 45.8256 51.9259H6.13377C-1.92794 51.5913 -1.92166 40.1071 6.13377 39.7753H45.8256C49.1755 39.7753 51.9009 42.5007 51.9009 45.8506ZM47.8507 45.8506C47.8507 44.734 46.9423 43.8255 45.8256 43.8255H6.13377C3.44657 43.9371 3.44859 47.7652 6.13377 47.8757H45.8256C46.9423 47.8757 47.8507 46.9674 47.8507 45.8506ZM40.7297 14.2228L51.3149 3.53354C53.1294 1.54905 50.4014 -1.14929 48.4369 0.683723L37.8513 11.3735C37.0252 12.2428 35.5508 12.2455 34.7217 11.3794L29.6604 6.16586C28.8815 5.36341 27.5993 5.34438 26.7968 6.12333C25.9944 6.90238 25.9753 8.18447 26.7544 8.98692L31.8234 14.2084C31.8279 14.2131 31.8324 14.2177 31.837 14.2223C33.0234 15.4214 34.6031 16.0818 36.2836 16.0817C37.9644 16.0817 39.5437 15.4214 40.7297 14.2228Z"
        fill="#E9314A"
      />
    </g>
    <defs>
      <clipPath id="clip0_217_244">
        <rect width="51.8519" height="51.8519" fill="white" transform="translate(0.0742188 0.0740662)" />
      </clipPath>
    </defs>
  </Svg>
);

export default Approved;
