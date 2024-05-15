import React from 'react';

import styles from './Price.scss';

interface IPrice {
  price: number;
  fontSize?: string | number;
}

const Price: React.FC<IPrice> = ({ price, fontSize = '0.825rem' }) => {
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
        <span key={`${i + Math.random() * 100}`} className={className} style={{ fontSize }}>
          $
        </span>
      ))}
    </>
  );
};

export default Price;
