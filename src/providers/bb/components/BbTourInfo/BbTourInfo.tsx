/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useState } from 'react';
import Model, { Providers } from '@tripian/model';
import moment from 'moment';
import BbTourInfoText from './BbTourInfoText/BbTourInfoText';
import BbTourInfoImage from './BbTourInfoImage/BbTourInfoImage';
// import BbTourInfoForm from './BbTourInfoForm/BbTourInfoForm';
import classes from './BbTourInfo.scss';
import CloseIconButton from '../../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import Accordion from '../../../../components/base/Accordion/Accordion';
import isoLanguages from '../../../gyg/components/GygTourInfo/GygTourOption/isoLanguages';
import Button from '../../../../components/base/Button/Button';

interface IBbTourInfo {
  product: Providers.Bb.Product;
  activityInfo: Providers.Bb.ActivityInfo;
  tripProfile: Model.TripProfile;
  tripCurrentDate: string;
  onBookNow: (bbUrl: string) => void;
  close: () => void;
  t: (value: Model.TranslationKey) => string;
}

const BbTourInfo: React.FC<IBbTourInfo> = ({ product, activityInfo, tripProfile, tripCurrentDate, onBookNow, close, t }) => {
  moment.locale(window.twindow.langCode);

  const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment(tripCurrentDate));
  /* const [selectedOffer, setSelectedOffer] = useState<Providers.Bb.Offer>(product.offers[0]); */

  const orderedSelectedDateOffers = useMemo(() => {
    const selectedDateOffers = product.offers.filter((pd) => pd.available && pd.date === selectedDate.format('YYYY-MM-DD'));
    selectedDateOffers.sort((a, b) => Number(a.startTimes[0].replace(':', '')) - Number(b.startTimes[0].replace(':', '')));
    return selectedDateOffers;
  }, [product.offers, selectedDate]);

  const minPrice = useMemo(() => {
    if (orderedSelectedDateOffers.length === 0) return '';

    const amount: number = orderedSelectedDateOffers[0].priceBreakDowns.find((pb) => pb.touristType === 'ADULT')?.price.amount ?? 0;
    if (amount === 0) {
      return `$${orderedSelectedDateOffers[0].priceBreakDowns[0].price.amount} per tour`;
    }
    return `$${amount} ${t('trips.myTrips.localExperiences.tourDetails.experience.perPerson')}`;

    /* const prices = orderedSelectedDateOffers
      .reduce((prev: number[], curr) => {
        const pbd = curr.priceBreakDowns.find((p) => p.touristType === 'ADULT');
        if (pbd) prev.push(pbd.price.amount);
        return prev;
      }, [])
      .sort((a, b) => a - b);
    return prices.length > 0 ? prices[0] : undefined; */
  }, [orderedSelectedDateOffers, t]);

  // const minAdult = useMemo(() => {
  //   const prices = orderedSelectedDateOffers
  //     .reduce((prev: number[], curr) => {
  //       const pbd = curr.priceBreakDowns.find((p) => p.touristType === 'ADULT');
  //       if (pbd) prev.push(pbd.price.amount);
  //       return prev;
  //     }, [])
  //     .sort((a, b) => a - b);
  //   return prices.length > 0 ? prices[0] : undefined;
  // }, [orderedSelectedDateOffers]);

  const offerList = useMemo(() => {
    if (orderedSelectedDateOffers.length > 0) {
      return (
        <div>
          <h4 className="center mb2">Available offers</h4>
          {orderedSelectedDateOffers.map((off, index) => {
            const adultPbd = off.priceBreakDowns.find((p) => p.touristType === 'ADULT')?.quantity || 1;
            const adultCount = Math.max(adultPbd, tripProfile.numberOfAdults);

            /* const activityBbUrl = `
            https://bookbarbados.com/book-experiences/experience-details/?packageoptions=experience&actid=${product.info.id}&offer=${off.offerKey}&check-out=${moment(off.date).format('MMM DD, YYYY')}&check-in=${moment(off.date).format(
              'MMM DD, YYYY',
            )}&adults=${adultCount}&children=${tripProfile.numberOfChildren || ''}&site=TRIPIAN`; */

            // https://bookbarbados.com/book-experiences/experience-details/?packageoptions=experience&actid=1881790&offer=gIx4zGTBr35EHngo&check-out=Nov%2026,%202022&check-in=Nov%2026,%202022
            // &adults=2&children=1&prefillDate=Nov%2026,%202022
            // &prefilladults=2&prefillchildage=1&site=TRIPIAN
            const activityBbUrl = `https://bookbarbados.com/book-experiences/experience-details/?packageoptions=experience&actid=${product.info.id}&offer=${off.offerKey}&check-in=${moment(off.date).format('MMM DD, YYYY')}&check-out=${moment(
              off.date,
            ).format('MMM DD, YYYY')}&adults=${adultCount}&children=${tripProfile.numberOfChildren || ''}&prefillDate=${moment(off.date).format('MMM DD, YYYY')}&prefilladults=${adultCount}&prefillchildage=1&site=TRIPIAN`;

            return (
              <Accordion
                key={off.offerKey}
                title={off.serviceName}
                id={index.toString()}
                defaultChecked={index === 0}
                content={
                  <div key={off.offerKey} className="row mb0">
                    <div className="col col4-m col12 mb2">Start Time : {off.startTimes[0]}</div>
                    <div className="col col4-m col12 mb2">Duration : {off.duration} min </div>
                    <div className="col col4-m col12 mb2">Languages : {off.languages.map((lg) => isoLanguages.find((iso) => iso.code === lg.langCode.toLowerCase())?.name).join(',')} </div>
                    <div className="col col4-m col12">
                      Price : <span className={classes.priceText}>{minPrice}</span>
                    </div>
                    {off.taxesAndFeesIncluded && (
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
          })}
        </div>
      );
    }

    return null;
  }, [minPrice, onBookNow, orderedSelectedDateOffers, product.info.id, tripProfile.numberOfAdults, tripProfile.numberOfChildren]);

  return (
    <div>
      <div className="row pt4">
        <h1 className={classes.bbTourInfoTitle}>{product.info.name}</h1>
        <div className={`${classes.bbTourInfoImgClose}`}>
          <CloseIconButton
            fill="#fff"
            clicked={() => {
              close();
            }}
          />
        </div>
        <div className={`col col12 col7-m ${classes.BbTourInfoImageMatch}`}>
          {/* <div className={classes.bbTourInfoMatch}>{`${Math.floor(Math.random() * 21) + 80}`}% match</div> */}
          <BbTourInfoImage images={activityInfo.images} />
        </div>
        {/* <div className="col col12 col5-m">
          <BbTourInfoForm
            tripProfile={tripProfile}
            date={selectedDate}
            price={minPrice}
            showNotFoundMessage={orderedSelectedDateOffers.length === 0}
            searchClick={() => {}}
            onChangeDate={(date) => {
              setSelectedDate(date);
            }}
          />
        </div> */}
        <div className="col col12">{offerList}</div>

        <div className="col col12 mb0">
          <BbTourInfoText activityInfo={activityInfo} />
        </div>
      </div>
    </div>
  );
};

export default BbTourInfo;
