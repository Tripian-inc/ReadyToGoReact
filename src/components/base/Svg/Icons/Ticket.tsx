import React from 'react';
import Svg from '../Svg';

interface ITicket {
  fill?: string;
  color?: string;
  size?: string;
  className?: string;
}

const Ticket: React.FC<ITicket> = ({ fill, color, size = '20px', className }) => (
  <Svg
    fill={fill}
    color={color}
    size={size}
    path="M44 62h18v-9a5 5 0 0 1 0-10v-9H44zm-2-28H2v28h40zm-4 21H6a1 1 0 0 1 0-2h32a1 1 0 0 1 0 2zm0-6H6a1 1 0 0 1 0-2h32a1 1 0 0 1 0 2zm0-6H16a1 1 0 0 1 0-2h22a1 1 0 0 1 0 2zM18.875 32l8.305-8.3a1 1 0 0 1 1.414 1.414L21.7 32h5.66l4.063-4.062a1 1 0 1 1 1.414 1.414L30.189 32h5.748a.981.981 0 0 1 .871 0h4.334L25.059 15.917 8.976 32zM59 21.574l-6.364-6.364a5 5 0 1 1-7.071-7.071L39.2 1.775 26.473 14.5 43.971 32h4.6z"
    viewBox="0 0 64 64"
    className={className}
  />
);

export default Ticket;
