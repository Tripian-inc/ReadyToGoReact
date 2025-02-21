import React from 'react';
import Svg from '../Svg';

interface ICheck {
  fill?: string;
  color?: string;
  size?: string;
  className?: string;
}

const Check: React.FC<ICheck> = ({ className, fill = '#000', color, size = '20px' }) => (
  <Svg
    className={className}
    fill={fill}
    color={color}
    size={size}
    path="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM22.386 10.146l-9.388 9.446-4.228-4.227c-0.39-0.39-1.024-0.39-1.415 0s-0.391 1.023 0 1.414l4.95 4.95c0.39 0.39 1.024 0.39 1.415 0 0.045-0.045 0.084-0.094 0.119-0.145l9.962-10.024c0.39-0.39 0.39-1.024 0-1.415s-1.024-0.39-1.415 0z"
    viewBox="0 0 32 32"
  />
);

export default Check;
