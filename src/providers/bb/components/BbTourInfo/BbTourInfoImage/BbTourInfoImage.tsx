/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers } from '@tripian/model';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './BbTourInfoImage.scss';

interface IBbTourInfoImage {
  images: Providers.Bb.ActivityInfoImage[];
}

const BbTourInfoImage: React.FC<IBbTourInfoImage> = ({ images }) => {
  const smallDevice = window.matchMedia('(max-width: 768px)').matches;

  return (
    <div className={classes.bbTourInfoGallery}>
      <Slider className="center" centerMode={!smallDevice} infinite={!smallDevice} draggable centerPadding="30px" accessibility slidesToShow={smallDevice ? 1 : 3} slidesToScroll={1} speed={500} dots>
        {images.map((image: Providers.Bb.ActivityInfoImage, index: number) => (
          <div className={classes.bbTourInfoImageContent} key={`bb-activity-img-${image.orderNumber}`}>
            <div tabIndex={index} className={classes.bbTourInfoImg}>
              <div className={classes.bbTourInfoImgDiv} style={{ backgroundImage: `url(${image.url})` }}>
                <svg viewBox="0 0 798 532" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default BbTourInfoImage;
