/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers, helper } from '@tripian/model';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './GygTourInfoImage.scss';

interface IGygTourInfoImage {
  tourImage: Providers.Gyg.TourPictures[];
}

const GygTourInfoImage: React.FC<IGygTourInfoImage> = ({ tourImage }) => {
  const tourImg = tourImage.map((picture) => picture.url);
  const formattedImg = helper.getYourGuideImageArrayFormat(tourImg, '146'); // 798px-532px	3:2

  const smallDevice = window.matchMedia('(max-width: 768px)').matches;

  return (
    <div className={classes.gygTourInfoGallery}>
      <Slider className="center" centerMode={!smallDevice} infinite={!smallDevice} draggable centerPadding="30px" accessibility slidesToShow={smallDevice ? 1 : 3} slidesToScroll={1} speed={500} dots>
        {formattedImg.map((imgUrl: string, index: number) => (
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

export default GygTourInfoImage;
