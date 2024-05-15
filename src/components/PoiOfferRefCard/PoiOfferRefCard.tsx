/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useState } from 'react';
import Model, { helper } from '@tripian/model';
import moment from 'moment';
import ImgLazy from '../base/ImgLazy/ImgLazy';
import Exclamation from '../base/Svg/Icons/Exclamation';
import Button from '../base/Button/Button';
import emptyImageData from '../../constant/emptyImage';
import classes from './PoiOfferRefCard.scss';

interface IPoiOfferRefCard {
  poi: Model.Poi;
  planDate?: string;
  poiCardClicked: (alternativePoi: Model.Poi) => void;
  isMyOffer: boolean;
}

const PoiOfferRefCard: React.FC<IPoiOfferRefCard> = ({ poi, planDate, poiCardClicked, isMyOffer }) => {
  const [captionArray, setCaptionArray] = useState<string[]>([]);

  moment.locale(window.twindow.langCode);

  const PoiImage = useMemo(() => {
    if (poi.image === null) {
      return emptyImageData;
    }
    if (poi.image.url.includes('Smbt')) {
      return helper.imgUrl(`${poi.image.url}`, 256, 256, 'Smbt');
    }
    return helper.imgUrl(`${poi.image.url}`, 256, 256);
  }, [poi.image]);

  const offer = useMemo(() => {
    const planDateTimeNow = moment(planDate);
    const currentOffer = poi.offers.find((o) => {
      const offerStartDate = moment(o.timeframe?.start);
      const offerEndDate = moment(o.timeframe?.end);
      return planDateTimeNow.isBetween(offerStartDate, offerEndDate, null, '[]');
    });
    if (currentOffer) {
      return currentOffer;
    }
    return poi.offers[0];
  }, [planDate, poi.offers]);

  const offerCaptionSplitter = (caption: string) => {
    let captionArr: string[] = [];

    if (caption.substring(0, 3) === 'Get') {
      if (caption.includes('free when you')) {
        captionArr = caption.split('free when you ');
      }
      if (caption.includes('any purchase of you')) {
        captionArr = caption.split('any purchase of you ');
      }
      if (caption.includes('your purchase when you')) {
        captionArr = caption.split('your purchase when you ');
      }

      [captionArr[0], captionArr[1]] = [captionArr[1], captionArr[0]];
    }

    if (caption.substring(0, 3) === 'Buy') {
      captionArr = caption.split('and ');
    }
    return captionArr;
  };

  const offMessage: string = useMemo(() => {
    if (offer.offerType === Model.OFFER_TYPE.PERCENTAGE) return `${offer.discount}% OFF`;
    if (offer.offerType === Model.OFFER_TYPE.AMOUNT) return `$${offer.discount} OFF`;
    return `${offer.discount}% OFF`;
  }, [offer.discount, offer.offerType]);

  useEffect(() => {
    setCaptionArray([...offerCaptionSplitter(offer.caption)]);
  }, [offer.caption]);

  return (
    <>
      <div className="hide-s">
        <div
          key={poi.id}
          className={classes.poiRefCard}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          onClick={() => {
            poiCardClicked(poi);
          }}
        >
          <div className={classes.poiOfferRefCardGeneralLeft}>
            <div className={classes.poiOfferRefCardImgGeneral}>
              <div className={classes.poiOfferRefCardTags}>
                {/* <div className={classes.poiOfferRefCardReceiveMethod}>{offer.productType.receiveMethod}</div> */}
                <div className={classes.poiOfferRefCardProductName}>{offer.productType.name}</div>
              </div>
              <div className={classes.poiRefCardImg}>
                <ImgLazy src={PoiImage} alt={poi.name} className={classes.poiRefCardImage} x={256} y={256} />
              </div>
            </div>
          </div>

          <div className={classes.poiOfferRefCardGeneralMid}>
            <div className={classes.poiRefCardName}>{poi.name}</div>
            <div className={classes.poiOfferRefCardTitle}>{offer.title}</div>
            {offer && (
              <div className={classes.poiOfferRefCardCaption}>
                <div className={classes.exclamationIcon}>
                  <Exclamation fill="var(--primary-color)" size="large" />
                </div>
                {captionArray[0]}
              </div>
            )}
            <div className={classes.poiOfferCardTimeFrame}>
              {offer?.optInDate && isMyOffer ? (
                <span>Opt-In Date: {moment(offer.optInDate).format('DD MMMM h:mm A')}</span>
              ) : (
                <span>
                  Offer Valid {moment(offer?.timeframe?.start).format('MMM Do')} - {moment(offer?.timeframe?.end).format('MMM Do')}
                </span>
              )}
            </div>
          </div>
          <div className={classes.poiOfferRefCardGeneralRight}>
            <div className={classes.poiOfferRefCardName}>{captionArray[1]}</div>
            {isMyOffer ? null : <div className={classes.optInText}>Click to opt-in</div>}
          </div>
        </div>
      </div>
      <div className="hide-m">
        <div className={classes.poiRefCard}>
          <div className={classes.poiRefCardImgGeneral}>
            <div className={classes.poiOfferRefCardOffMsg}>{offMessage}</div>
            <ImgLazy src={PoiImage} alt={poi.name} className={classes.poiRefCardImage} x={256} y={256} />
          </div>
          <div className={classes.poiOfferRefCardBottom}>
            <div className={classes.poiOfferRefCardTitleWrapper}>
              <div className={classes.poiRefCardName}>{poi.name}</div>
              {/* {offer.productType.receiveMethod} */}
            </div>
            <div className={classes.poiOfferRefCardDescWrapper}>
              {offer.title}
              {offer?.optInDate && isMyOffer ? (
                <span>Opt-In Date: {moment(offer.optInDate).format('DD MMMM h:mm A')}</span>
              ) : (
                <span>
                  Offer Valid {moment(offer?.timeframe?.start).format('MMM Do')} - {moment(offer?.timeframe?.end).format('MMM Do')}
                </span>
              )}

              {captionArray[0]}
              <Button
                onClick={() => {
                  poiCardClicked(poi);
                }}
                className={classes.offerButton}
                text={captionArray[1]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoiOfferRefCard;
