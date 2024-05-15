/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CloseIconButton from '../../base/Button/Icons/CloseIconButton/CloseIconButton';
import ImgLazy from '../../base/ImgLazy/ImgLazy';
import ModalFull from '../../base/ModalFull/ModalFull';
import emptyImageData from '../../../constant/emptyImage';
import classes from './PoiInfoImage.scss';

interface IPoiInfoImage {
  poi: Model.Poi;
  hideButtons?: boolean;
  close: () => void;
  square: boolean;
  t: (value: Model.TranslationKey) => string;
}

const PoiInfoImage: React.FC<IPoiInfoImage> = ({ poi, hideButtons = false, close, square, t }) => {
  /* const [fakeImg, setFakeImg] = useState<boolean>(true); */

  const images = poi.gallery.length === 0 ? [{ url: emptyImageData, imageOwner: null }] : poi.gallery.map((img) => ({ url: helper.imgUrl(img.url, 800), imageOwner: img.imageOwner }));

  const [imageZoomed, setImageZoomed] = useState<{ clicked: boolean; url: string }>({ clicked: false, url: '' });

  const orderedImages = () => {
    const index = images.findIndex((i) => i.url === imageZoomed.url);
    if (index > -1) {
      const newImages = [...images];
      return newImages.slice(index).concat(newImages.slice(0, index));
    }
    return [];
  };

  return (
    <div className={classes.gallery}>
      <div className="hide-s">
        <ModalFull className={classes.zoomedImage} show={imageZoomed.clicked}>
          <div className={`${classes.modalCloseIcon} m2`}>
            <CloseIconButton
              fill="#fff"
              clicked={() => {
                setImageZoomed({ clicked: false, url: '' });
              }}
            />
          </div>

          <div className={classes.gallery}>
            <div className={classes.galleryWrapper}>
              <Slider accessibility slidesToShow={1} slidesToScroll={1} infinite={false} dots speed={500} lazyLoad="ondemand">
                {orderedImages().map((img) => (
                  <div className={classes.modalContent} key={img.url}>
                    <div className={square ? undefined : classes.img}>
                      <ImgLazy objectFit={square ? 'cover' : 'contain'} key={img.url} src={img.url} alt="" x={600} y={600} />
                    </div>
                    {img.imageOwner && img.imageOwner.url && (
                      <span className={classes.imageOwner}>
                        <a rel="noopener noreferrer" target="_blank" href={`${img.imageOwner.url}`}>
                          © {t('trips.myTrips.itinerary.step.poi.photo')} {img.imageOwner?.title}
                        </a>
                      </span>
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </ModalFull>
      </div>

      <Slider accessibility slidesToShow={1} slidesToScroll={1} infinite={false} speed={500} dots>
        {images.map((img, index) => (
          /* const myImage = new Image();
          myImage.src = img.url;
          myImage.onload = () => {
            setFakeImg(false);
          }; */

          <div className={classes.content} key={img.url}>
            <div
              tabIndex={index}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setImageZoomed({ clicked: true, url: img.url });
              }}
              role="button"
              onKeyDown={() => {}}
              className={square ? undefined : classes.img}
            >
              <ImgLazy objectFit={square ? 'cover' : 'contain'} key={img.url} src={img.url} alt="" x={800} y={800} />
              {/* {fakeImg ? <svg viewBox="0 0 800 800" /> : <img key={img.url} src={img.url} alt="" />} */}
            </div>
            {img.imageOwner && img.imageOwner.url && (
              <span className={classes.imageOwner}>
                <a rel="noopener noreferrer" target="_blank" href={`${img.imageOwner.url}`}>
                  © {t('trips.myTrips.itinerary.step.poi.photo')} {img.imageOwner?.title}
                </a>
              </span>
            )}
          </div>
        ))}
      </Slider>
      {!hideButtons ? (
        <>
          <div className={classes.close}>
            <CloseIconButton
              fill="#fff"
              clicked={() => {
                close();
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PoiInfoImage;
