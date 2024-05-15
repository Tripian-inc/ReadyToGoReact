import React from 'react';
import Svg from '../Svg';

interface IBooking {
  fill?: string;
  color?: string;
  size?: string;
}

const Booking: React.FC<IBooking> = ({ fill, color, size = '20px' }) => (
  <Svg fill={fill} color={color} size={size} path="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 4H11V9L10 8.25L9 9V4ZM18 20H6V4H7V13L10 10.75L13 13V4H18V20Z" viewBox="0 0 24 24" />
);

export default Booking;
