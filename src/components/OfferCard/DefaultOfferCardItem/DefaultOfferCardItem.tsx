/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useState } from 'react';
import Model from '@tripian/model';
import moment from 'moment';
import ImgLazy from '../../base/ImgLazy/ImgLazy';
import Exclamation from '../../base/Svg/Icons/Exclamation';
import PreLoading from '../../base/PreLoading/PreLoading';
import classes from './DefaultOfferCardItem.scss';

interface IDefaultOfferCardItem {
  poiName?: string;
  redeemText?: string;
  offer: Model.Offer;
  poiImage: string;
  optedIn: boolean;
  isMyOffer?: boolean;
  isLoadingOffer: (offerId: number) => boolean;
  optClicked: (optIn: boolean, id: number) => void;
  cardClicked?: () => void;
  redeemClicked: () => void;
}

const DefaultOfferCardItem: React.FC<IDefaultOfferCardItem> = ({ poiName, redeemText, offer, poiImage, optedIn, isMyOffer, isLoadingOffer, optClicked, cardClicked, redeemClicked }) => {
  const [captionArray, setCaptionArray] = useState<string[]>([]);

  moment.locale(window.twindow.langCode);

  const offMessage: string = useMemo(() => {
    if (offer.offerType === Model.OFFER_TYPE.PERCENTAGE) return `${offer.discount}% OFF`;
    if (offer.offerType === Model.OFFER_TYPE.AMOUNT) return `$${offer.discount} OFF`;
    return `${offer.discount}% OFF`;
  }, [offer.discount, offer.offerType]);

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

  useEffect(() => {
    setCaptionArray([...offerCaptionSplitter(offer.caption)]);
  }, [offer.caption]);

  return (
    <>
      <div className="hide-s">
        <div className={classes.OfferCard}>
          <div className={classes.poiOfferRefCardGeneralLeft}>
            <div className={classes.poiOfferRefCardImgGeneral}>
              <div className={classes.poiOfferRefCardTags}>
                {/* <div className={classes.poiOfferRefCardReceiveMethod}>{offer.productType.receiveMethod}</div> */}
                <div className={classes.poiOfferRefCardProductName}>{offer.productType.name}</div>
              </div>
              <div
                className={classes.poiRefCardImg}
                onClick={(event) => {
                  event.stopPropagation();
                  if (cardClicked) cardClicked();
                }}
                role="button"
                onKeyDown={() => {}}
                tabIndex={0}
              >
                <ImgLazy src={poiImage} alt={offer.caption} className={classes.poiRefCardImage} x={256} y={256} />
              </div>
            </div>
          </div>

          <div className={classes.poiOfferRefCardGeneralMid}>
            <div
              className={classes.poiRefCardName}
              onClick={(event) => {
                event.stopPropagation();
                if (cardClicked) cardClicked();
              }}
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
            >
              {poiName}
            </div>
            <div className={classes.poiOfferRefCardTitle}>{offer.title}</div>
            {offer && (
              <div className={classes.poiOfferRefCardCaption}>
                <div className={classes.exclamationIcon}>
                  <Exclamation fill="var(--primary-color)" size="large" />
                </div>
                <span className={classes.caption}>{captionArray[0]}</span>
              </div>
            )}
            <div className={classes.poiOfferCardTimeFrame}>
              {offer?.optInDate && isMyOffer ? (
                <span className={classes.timeframe}>Opt-In Date: {moment(offer.optInDate).format('DD MMMM h:mm A')}</span>
              ) : (
                <span className={classes.timeframe}>
                  Offer Valid {moment(offer?.timeframe?.start).format('MMM Do')} - {moment(offer?.timeframe?.end).format('MMM Do')}
                </span>
              )}
            </div>
          </div>
          <div className={classes.poiOfferRefCardGeneralRight}>
            <div className={classes.poiOfferRefCardName}>{captionArray[1]}</div>
            {isLoadingOffer(offer.id) ? (
              <div className={classes.loadingWrapper}>
                <PreLoading color="#fff" size="small" />
              </div>
            ) : (
              <div
                className={classes.optInText}
                onClick={() => {
                  if (optedIn) optClicked(false, offer.id);
                  else optClicked(true, offer.id);
                }}
                role="button"
                onKeyDown={() => {}}
                tabIndex={0}
              >
                {optedIn ? 'Click to opt-out' : 'Click to opt-in'}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hide-m">
        <div className={classes.poiRefCard}>
          <div
            className={classes.poiRefCardImgGeneral}
            onClick={(event) => {
              event.stopPropagation();
              if (cardClicked) cardClicked();
            }}
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
          >
            <div className={classes.poiOfferRefCardOffMsg}>{offMessage}</div>
            <ImgLazy src={poiImage} alt={offer.caption} className={classes.poiRefCardImage} x={256} y={256} />
          </div>
          <div className={classes.poiOfferRefCardBottom}>
            {/* <div className={classes.poiOfferRefCardTitleWrapper}>{offer.productType.receiveMethod}</div> */}
            <div className={classes.poiOfferRefCardDescWrapper}>
              <div className={classes.offerTitle}>{offer.title}</div>
              <span>
                Offer Valid {moment(offer?.timeframe?.start).format('MMM Do')} - {moment(offer?.timeframe?.end).format('MMM Do')}
              </span>
              <div>{offer.caption}</div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className={classes.mobileButtonsWrapper}>
                  <div
                    className={classes.optInText}
                    onClick={() => {
                      if (optedIn) optClicked(false, offer.id);
                      else optClicked(true, offer.id);
                    }}
                    role="button"
                    style={{ backgroundColor: optedIn ? 'gray' : 'var(--background-color)', color: optedIn ? '#fff' : 'var(--text-primary-color)' }}
                    onKeyDown={() => {}}
                    tabIndex={0}
                  >
                    {isLoadingOffer(offer.id) ? <PreLoading color={optedIn ? '#fff' : 'var(--text-primary-color)'} size="small" /> : <>{optedIn ? 'Click to opt-out' : 'Click to opt-in'}</>}
                  </div>

                  {optedIn ? (
                    <div onClick={redeemClicked} role="button" onKeyDown={() => {}} tabIndex={0} className={classes.redeemButton}>
                      {redeemText ?? 'Redeem'}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultOfferCardItem;
