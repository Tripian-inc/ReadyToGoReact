/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers } from '@tripian/model';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import emptyImageData from '../../../../constant/emptyImage';
import classes from './RezdyTourInfoImage.scss';

interface IRezdyTourInfoImage {
  tourImages: Providers.Rezdy.ProductImage[];
}

const RezdyTourInfoImage: React.FC<IRezdyTourInfoImage> = ({ tourImages }) => {
  const smallDevice = window.matchMedia('(max-width: 768px)').matches;

  const images = tourImages.length === 0 ? [emptyImageData] : tourImages.map((img) => img.itemUrl);

  return (
    <div className={classes.gygTourInfoGallery}>
      <Slider className="center" centerMode={!smallDevice && tourImages.length > 1} infinite={!smallDevice && tourImages.length > 1} draggable centerPadding="30px" accessibility slidesToShow={smallDevice ? 1 : 3} slidesToScroll={1} speed={500} dots>
        {images.map((img: string, index: number) => (
          <div className={classes.gygTourInfoImageContent} key={index}>
            <div tabIndex={index} className={classes.gygTourInfoImg}>
              <div className={classes.gygTourInfoImgDiv} style={{ backgroundImage: `url(${img})`, backgroundSize: `${tourImages.length === 0 ? 'contain' : 'cover'}` }}>
                <svg viewBox="0 0 798 532" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RezdyTourInfoImage;
