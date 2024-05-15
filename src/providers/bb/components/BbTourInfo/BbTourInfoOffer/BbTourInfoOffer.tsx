import React from 'react';
import { Providers } from '@tripian/model';
import moment from 'moment';
import isoLanguages from '../../../../gyg/components/GygTourInfo/GygTourOption/isoLanguages';
import Accordion from '../../../../../components/base/Accordion/Accordion';
import Button from '../../../../../components/base/Button/Button';
import classes from './BbTourInfoOffer.scss';

interface IBbTourInfoOffer {
  productId: number;
  offer: Providers.Bb.Offer;
  numberOfAdults: number;
  numberOfChildren: number;
  minPrice: string;
  defaultChecked: boolean;
  onBookNow: (bbUrl: string) => void;
}

const BbTourInfoOffer: React.FC<IBbTourInfoOffer> = ({ productId, offer, numberOfAdults, numberOfChildren = 0, minPrice, defaultChecked, onBookNow }) => {
  const adultPbd = offer.priceBreakDowns.find((p) => p.touristType === 'ADULT')?.quantity || 1;
  const adultCount = Math.max(adultPbd, numberOfAdults);

  moment.locale(window.twindow.langCode);

  const activityBbUrl = `https://bookbarbados.com/book-experiences/experience-details/?packageoptions=experience&actid=${productId}&offer=${offer.offerKey}&check-in=${moment(offer.date).format('MMM DD, YYYY')}&check-out=${moment(offer.date).format(
    'MMM DD, YYYY',
  )}&adults=${adultCount}&children=${numberOfChildren || ''}&prefillDate=${moment(offer.date).format('MMM DD, YYYY')}&prefilladults=${adultCount}&prefillchildage=${numberOfChildren || ''}&site=TRIPIAN`;

  return (
    <Accordion
      title={offer.serviceName}
      id={offer.offerKey}
      defaultChecked={defaultChecked}
      content={
        <div key={offer.offerKey} className="row mb0">
          <div className="col col4-m col12 mb2">Start Time : {offer.startTimes[0]}</div>
          <div className="col col4-m col12 mb2">Duration : {offer.duration} min </div>
          <div className="col col4-m col12 mb2">Languages : {offer.languages.map((lg) => isoLanguages.find((iso) => iso.code === lg.langCode.toLowerCase())?.name).join(',')} </div>
          <div className="col col4-m col12">
            Price : <span className={classes.priceText}>{minPrice}</span>
          </div>
          {offer.taxesAndFeesIncluded && (
            <div className="col col4-m col12">
              <div className={classes.feeText}>(All taxes and fees included)</div>
            </div>
          )}
          <div className="col col12 center mb0">
            <Button
              text="Book Now"
              color="danger"
              onClick={() => {
                onBookNow(activityBbUrl);
              }}
              style={{ minWidth: '10rem' }}
            />
          </div>
        </div>
      }
    />
  );
};

export default BbTourInfoOffer;
