/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-danger */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Providers, helper } from '@tripian/model';
import classes from './BbCarRentInfo.scss';
import CloseIconButton from '../../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import Button from '../../../../components/base/Button/Button';
import ImgLazy from '../../../../components/base/ImgLazy/ImgLazy';

interface IBbCarRentInfo {
  pickUpDateTime: string;
  dropOffDateTime: string;
  offer: Providers.Bb.SearchCarRentOffer;
  onRentNow: (url: string) => void;
  close: () => void;
  dateOfBirth?: string | null;
}

const BbCarRentInfo: React.FC<IBbCarRentInfo> = ({ pickUpDateTime, dropOffDateTime, offer, onRentNow, close, dateOfBirth }) => {
  const age: number = dateOfBirth ? helper.getAge(dateOfBirth) : 24;

  return (
    <div className={classes.bbCarRentInfo}>
      <Slider accessibility slidesToShow={1} slidesToScroll={1} infinite={false} speed={500} dots>
        {offer.images.map((img, index) => (
          <div className={classes.content} key={img}>
            <div tabIndex={index} className={classes.img}>
              <ImgLazy referrerPolicy="no-referrer" objectFit="contain" key={img} src={img} y={400} alt="" />
            </div>
            <span className={classes.imageOwner}>© Photo {offer.carRentCompanyName}</span>
          </div>
        ))}
      </Slider>
      <h3 className={classes.title}>{offer.name}</h3>
      <div className="row py1">
        <div className="col col12">
          <div className={classes.shortDesc}>
            <input type="checkbox" id="description" className={classes.descToggle} />
            <label htmlFor="description" className={classes.descContent} dangerouslySetInnerHTML={{ __html: offer.shortDescription }} />
          </div>
        </div>

        <div className="col col12">
          <b>Address:</b>
          &nbsp;{offer.address}
        </div>

        {offer.description && (
          <div className="col col12">
            <b>Description:</b>
            &nbsp;{offer.description?.replace(/<\/p>/g, '').replace(/<p>/g, '')}
          </div>
        )}

        {offer.features.length > 0 && (
          <div className="col col12">
            <h4>Features:</h4>
            {offer.features.map((feature) => (
              <span key={feature} className={classes.tag}>
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="col col12 center">
          <Button
            text="VIEW DEALS"
            color="danger"
            onClick={() => {
              const carRentBbUrl = `https://bookbarbados.com/book-cars/?packageoptions=carrental&age=${age}&leaving-from=Rental%20Office&going-to=Rental%20Office&check-in=${pickUpDateTime}&check-out=${dropOffDateTime}&site=TRIPIAN`;
              // console.log('onRentNow:', carRentBbUrl);
              onRentNow(carRentBbUrl);
            }}
            style={{ width: '100%' }}
          />
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
