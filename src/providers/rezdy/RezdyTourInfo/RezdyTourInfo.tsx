/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Model, { Providers } from '@tripian/model';
import ImgLazy from '../../../components/base/ImgLazy/ImgLazy';
import Address from '../../../components/base/Svg/Icons/Address';
import Copy from '../../../components/base/Copy/Copy';
import ShowMoreLess from '../../../components/base/ShowMoreLess/ShowMoreLess';
import CloseIconButton from '../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import emptyImageData from '../../../constant/emptyImage';
import Timer from '../../../components/base/Svg/Icons/Timer';
import classes from './RezdyTourInfo.scss';

interface IRezdyTourInfo {
  product: Providers.Rezdy.Product;
  onBookingNow: () => void;
  close: () => void;
  t: (value: Model.TranslationKey) => string;
}

const RezdyTourInfo: React.FC<IRezdyTourInfo> = ({ product, onBookingNow, close, t }) => {
  const images = product.images.length === 0 ? [emptyImageData] : product.images.map((img) => img.itemUrl);

  return (
    <div className={classes.rezdyTourInfo}>
      <Slider accessibility slidesToShow={1} slidesToScroll={1} infinite={false} speed={500} dots={false}>
        {images.map((img, index) => (
          <div className={classes.content} key={index}>
            <div tabIndex={index} className={classes.img}>
              <ImgLazy className={classes.rezdyTourInfoImg} classNameLazyLoading={classes.rezdyTourInfoImgLazy} referrerPolicy="no-referrer" objectFit="contain" key={index} src={img} y={400} alt="" />
            </div>
          </div>
        ))}
      </Slider>

      <div className="row py1">
        <h3 className={classes.title}>{product.name}</h3>

        {product.shortDescription && (
          <div className="col col12 px0">
            <div dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
          </div>
        )}

        {(product.locationAddress.addressLine || product.locationAddress.state) && (
          <div className={`col col12 ${classes.rezdyTourInfoTextRowBox}`}>
            <div className={classes.rezdyTourInfoAddress}>
              <div className={classes.addressIcon}>
                <Address size="1rem" />
              </div>
              <span>{product.locationAddress.addressLine || product.locationAddress.state}</span>
            </div>
            <Copy copyText={product.locationAddress.addressLine || product.locationAddress.state} t={t} />
          </div>
        )}

        {product.durationMinutes && (
          <div className={`col col12 ${classes.rezdyTourInfoTextRowBox}`}>
            <div className={classes.rezdyTourInfoAddress}>
              <Timer className={classes.poiInfoTextIcon} />
              <span>{product.durationMinutes} minutes</span>
            </div>
          </div>
        )}

        {product.description && (
          <div className="col col12 px0">
            <h4 className={classes.rezdyTourInfoHeaderText}>Descriptions</h4>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}

        {product.tags.length > 0 && (
          <div className="col col12 px0">
            <h4 className={classes.rezdyTourInfoHeaderText}>Features</h4>
            <ShowMoreLess items={product.tags} defaultItemCount={3} t={t} />
          </div>
        )}

        <div className={classes.rezdyTourInfoBottom}>
          <button type="button" className={classes.rezdyTourInfoPrimaryButton} onClick={onBookingNow}>
            Booking
          </button>
        </div>
      </div>

      <div className={classes.close}>
        <CloseIconButton
          fill="#fff"
          clicked={() => {
            close();
          }}
        />
      </div>
    </div>
  );
};
export default RezdyTourInfo;
