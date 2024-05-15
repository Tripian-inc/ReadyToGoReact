import React from 'react';
import IIconSvg from './IIconSvg';
import Svg from '../Svg';

const Web: React.FC<IIconSvg> = ({ className, bgColor, size = '20px' }) => (
  <Svg className={className} color={bgColor} size={size} path="" viewBox="0 0 20 20">
    <path d="M7.49173 17.9167C6.1084 17.9167 4.71673 17.3917 3.6584 16.3333C1.55007 14.2167 1.55007 10.7833 3.6584 8.675C3.90007 8.43333 4.30007 8.43333 4.54173 8.675C4.7834 8.91666 4.7834 9.31666 4.54173 9.55833C2.91673 11.1833 2.91673 13.825 4.54173 15.45C6.16673 17.075 8.8084 17.075 10.4334 15.45C11.2167 14.6667 11.6501 13.6167 11.6501 12.5C11.6501 11.3917 11.2167 10.3417 10.4334 9.55C10.1917 9.30833 10.1917 8.90833 10.4334 8.66666C10.6751 8.425 11.0751 8.425 11.3167 8.66666C12.3417 9.69166 12.9001 11.05 12.9001 12.5C12.9001 13.95 12.3334 15.3083 11.3167 16.3333C10.2667 17.3917 8.8834 17.9167 7.49173 17.9167Z" />
    <path d="M15.8917 11.8C15.7334 11.8 15.5751 11.7417 15.4501 11.6167C15.2084 11.375 15.2084 10.975 15.4501 10.7333C17.1584 9.025 17.1584 6.25 15.4501 4.55C13.7417 2.84167 10.9667 2.84167 9.26673 4.55C8.44173 5.375 7.9834 6.475 7.9834 7.64167C7.9834 8.80834 8.44173 9.90834 9.26673 10.7333C9.5084 10.975 9.5084 11.375 9.26673 11.6167C9.02506 11.8583 8.62507 11.8583 8.3834 11.6167C7.32507 10.5583 6.7334 9.14167 6.7334 7.64167C6.7334 6.14167 7.31673 4.725 8.3834 3.66667C10.5751 1.475 14.1417 1.475 16.3417 3.66667C18.5334 5.85834 18.5334 9.43334 16.3417 11.625C16.2167 11.7417 16.0501 11.8 15.8917 11.8Z" />
  </Svg>
);

export default Web;
