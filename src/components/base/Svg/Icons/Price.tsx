/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Svg from '../Svg';
import IIconSvg from './IIconSvg';

const PriceIcon: React.FC<IIconSvg> = ({ className, fill, bgColor }) => (
  <Svg
    className={className}
    fill={fill}
    bgColor={bgColor}
    path="M4.746 7.336C3.542 7.168 2.968 6.776 2.968 6.076V6.034C2.968 5.292 3.64 4.858 4.746 4.858C5.964 4.858 6.65 5.39 6.748 6.16L6.762 6.398H9.03L9.002 6.146C8.764 4.2 7.756 3.038 5.726 2.786L5.796 0.994H3.976L4.032 2.758C1.82 2.982 0.7 4.13 0.7 5.95V6.034C0.7 7.77 1.806 8.918 3.934 9.24L5.404 9.436C6.496 9.618 6.916 9.996 6.916 10.64V10.696C6.916 11.494 6.23 11.872 4.886 11.872C3.584 11.872 3.01 11.452 2.884 10.402L2.856 10.192H0.588L0.616 10.486C0.826 12.628 2.002 13.734 4.046 13.958L3.976 15.932H5.796L5.726 13.958C8.036 13.734 9.184 12.558 9.184 10.724V10.64C9.184 8.862 8.036 7.756 5.852 7.462L4.746 7.336Z"
    viewBox="0 0 10 16"
  />
);

export default PriceIcon;
