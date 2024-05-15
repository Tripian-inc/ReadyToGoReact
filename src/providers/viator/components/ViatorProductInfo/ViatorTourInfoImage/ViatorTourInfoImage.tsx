/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers } from '@tripian/model';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './ViatorTourInfoImage.scss';

interface IViatorTourInfoImage {
  tourImage: Providers.Viator.TourImages[];
}

const ViatorTourInfoImage: React.FC<IViatorTourInfoImage> = ({ tourImage }) => {
  const tourImg = tourImage.map((image) => image.variants.find((x) => x.width === 400)?.url || image.variants[0].url);

  const smallDevice = window.matchMedia('(max-width: 768px)').matches;

  return (
    <div className={classes.gygTourInfoGallery}>
      <Slider className="center" centerMode={!smallDevice} infinite={!smallDevice} draggable centerPadding="30px" accessibility slidesToShow={smallDevice ? 1 : 3} slidesToScroll={1} speed={500} dots>
        {tourImg.map((imgUrl: string, index: number) => (
          <div className={classes.gygTourInfoImageContent} key={imgUrl}>
            <div tabIndex={index} className={classes.gygTourInfoImg}>
              <div className={classes.gygTourInfoImgDiv} style={{ backgroundImage: `url(${imgUrl})` }}>
                <svg viewBox="0 0 798 532" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ViatorTourInfoImage;
