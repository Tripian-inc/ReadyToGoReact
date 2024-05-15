/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { helper } from '@tripian/model';
import DefaultOfferCardItem from './DefaultOfferCardItem/DefaultOfferCardItem';
import VoucherOfferCardItem from './VoucherOfferCardItem/VoucherOfferCardItem';

interface IOfferCard {
  poiName?: string;
  planDate?: string;
  offer: Model.Offer;
  optedIn: boolean;
  isMyOffer?: boolean;
  optClicked: (optIn: boolean, id: number, optInDate?: string) => void;
  cardClicked?: () => void;
  isLoadingOffer: (offerId: number) => boolean;
  redeemClicked?: () => void;
}

const OfferCard: React.FC<IOfferCard> = ({ poiName, /* planDate, */ offer, optedIn, isMyOffer, optClicked, cardClicked, isLoadingOffer, redeemClicked }) => {
  const PoiImage = offer.imageUrl.includes('Smbt') ? helper.imgUrl(`${offer.imageUrl}`, 256, 256, 'Smbt') : helper.imgUrl(`${offer.imageUrl}`, 256, 256);

  /* const planDateTimeNowOffer = useMemo(() => {
    const planDateTimeNow = moment(planDate);
    const offerStartDate = moment(offer.timeframe?.start);
    const offerEndDate = moment(offer.timeframe?.end);

    const isBetweenInterval = planDateTimeNow.isBetween(offerStartDate, offerEndDate, null, '[]');

    if (isBetweenInterval) {
      return offer;
    }
    return null;
  }, [offer, planDate]); */

  // if (planDateTimeNowOffer) {
  if (offer.offerType === Model.OFFER_TYPE.VOUCHER) {
    return (
      <VoucherOfferCardItem offer={offer} poiName={poiName} optClicked={optClicked} cardClicked={cardClicked} isLoadingOffer={isLoadingOffer} optedIn={optedIn} poiImage={PoiImage} isMyOffer={isMyOffer} redeemClicked={redeemClicked ?? (() => {})} />
    );
  }
  return <DefaultOfferCardItem poiName={poiName} optClicked={optClicked} isLoadingOffer={isLoadingOffer} offer={offer} optedIn={optedIn} poiImage={PoiImage} isMyOffer={isMyOffer} />;
  // }

  return null;
};

export default OfferCard;
