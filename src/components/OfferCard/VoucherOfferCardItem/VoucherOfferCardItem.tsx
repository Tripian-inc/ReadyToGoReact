/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import Model from '@tripian/model';
import VoucherOfferCardItemDesktop from './VoucherOfferCardItemDesktop/VoucherOfferCardItemDesktop';
import VoucherOfferCardItemMobile from './VoucherOfferCardItemMobile/VoucherOfferCardItemMobile';

interface IVoucherOfferCardItem {
  offer: Model.Offer;
  poiImage: string;
  poiName?: string;
  optedIn: boolean;
  isMyOffer?: boolean;
  isLoadingOffer: (offerId: number) => boolean;
  optClicked: (optIn: boolean, id: number, optInDate?: string) => void;
  cardClicked?: () => void;
  redeemClicked: () => void;
}

const VoucherOfferCardItem: React.FC<IVoucherOfferCardItem> = ({ offer, poiImage, poiName, optedIn, isMyOffer, isLoadingOffer, optClicked, cardClicked, redeemClicked }) => (
  <>
    <div className="hide-s">
      <VoucherOfferCardItemDesktop offer={offer} poiImage={poiImage} poiName={poiName} optedIn={optedIn} isMyOffer={isMyOffer} isLoadingOffer={isLoadingOffer} optClicked={optClicked} cardClicked={cardClicked} redeemClicked={redeemClicked} />
    </div>
    <div className="hide-m">
      <VoucherOfferCardItemMobile offer={offer} poiImage={poiImage} poiName={poiName} optedIn={optedIn} isMyOffer={isMyOffer} isLoadingOffer={isLoadingOffer} optClicked={optClicked} cardClicked={cardClicked} redeemClicked={redeemClicked} />
    </div>
  </>
);

export default VoucherOfferCardItem;
