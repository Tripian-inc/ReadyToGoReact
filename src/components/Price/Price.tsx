import React from 'react';
import PriceIcon from '../base/Svg/Icons/Price';
import styles from './Price.scss';

interface IPrice {
  price: number;
}

const Price: React.FC<IPrice> = ({ price }) => {
  const priceClasses = [];
  for (let i = 1; i < 5; i += 1) {
    if (i <= price) {
      priceClasses.push(styles.fill);
    } else {
      priceClasses.push(styles.empty);
    }
  }
  return (
    <>
      {priceClasses.map((className, i) => (
        <PriceIcon className={className} key={`${i + Math.random() * 100}`} />
      ))}
    </>
  );
};

export default Price;
