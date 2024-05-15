/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Model, { Providers, helper } from '@tripian/model';
import classes from './BbCarRentInfo.scss';
import CloseIconButton from '../../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import ImgLazy from '../../../../components/base/ImgLazy/ImgLazy';
import Address from '../../../../components/base/Svg/Icons/Address';
import Copy from '../../../../components/base/Copy/Copy';
import ReadMoreLess from '../../../../components/base/ReadMoreLess/ReadMoreLess';
import ShowMoreLess from '../../../../components/base/ShowMoreLess/ShowMoreLess';

interface IBbCarRentInfo {
  pickUpDateTime: string;
  dropOffDateTime: string;
  offer: Providers.Bb.SearchCarRentOffer;
  onRentNow: (url: string) => void;
  close: () => void;
  dateOfBirth?: string | null;
  t: (value: Model.TranslationKey) => string;
}

const BbCarRentInfo: React.FC<IBbCarRentInfo> = ({ pickUpDateTime, dropOffDateTime, offer, onRentNow, close, dateOfBirth, t }) => {
  const age: number = dateOfBirth && helper.getAge(dateOfBirth) >= 24 ? helper.getAge(dateOfBirth) : 24;

  const offerDescription = offer.description?.replace(/<\/p>/g, '').replace(/<p>/g, '');

  return (
    <div className={classes.bbCarRentInfo}>
      <Slider accessibility slidesToShow={1} slidesToScroll={1} infinite={false} speed={500} dots={false}>
        {offer.images.map((img, index) => (
          <div className={classes.content} key={img}>
            <div tabIndex={index} className={classes.img}>
              <ImgLazy className={classes.bbCarRentInfoImg} classNameLazyLoading={classes.bbCarRentInfoImgLazy} referrerPolicy="no-referrer" objectFit="contain" key={img} src={img} y={400} alt="" />
            </div>
            <span className={classes.imageOwner}>© Photo {offer.carRentCompanyName}</span>
          </div>
        ))}
      </Slider>

      <div className="row py1">
        <h3 className={classes.title}>{offer.name}</h3>
        <div className={`col col12 ${classes.bbCarRentInfoTextRowBox}`}>
          <div className={classes.bbCarRentInfoAddress}>
            <div className={classes.addressIcon}>
              <Address size="1rem" />
            </div>
            <span>{offer.address}</span>
          </div>
          <Copy copyText={offer.address} t={t} />
        </div>

        {offer.description && (
          <div className="col col12 px0">
            <h4 className={classes.bbCarRentInfoHeaderText}>Descriptions</h4>
            <ReadMoreLess desc={offerDescription} defaultCharLenght={180} t={t} />
          </div>
        )}

        {offer.features.length > 0 && (
          <div className="col col12 px0">
            <h4 className={classes.bbCarRentInfoHeaderText}>Features</h4>
            <ShowMoreLess items={offer.features} defaultItemCount={3} t={t} />
          </div>
        )}

        <div className={classes.bbCarRentInfoBottom}>
          <button
            type="button"
            className={classes.bbCarRentInfoPrimaryButton}
            onClick={() => {
              const carRentBbUrl = `https://bookbarbados.com/book-cars/?packageoptions=carrental&age=${age}&leaving-from=Rental%20Office&going-to=Rental%20Office&check-in=${pickUpDateTime}&check-out=${dropOffDateTime}&site=TRIPIAN`;
              // console.log('onRentNow:', carRentBbUrl);
              onRentNow(carRentBbUrl);
            }}
          >
            View Deals
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
export default BbCarRentInfo;
