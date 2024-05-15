import React from 'react';
import styles from './Img.scss';

interface IImg {
  src: string;
  srcSet: string;
  alt: string;
}

const Img: React.FC<IImg> = ({ src, srcSet, alt }) => (
  <div className={styles.imgCover3}>
    <div className={styles.imgCover2}>
      <div className={styles.imgCover1}>
        <img className={styles.img} alt={alt} src={src} srcSet={srcSet} decoding="async" />
      </div>
    </div>
  </div>
);

export default Img;
