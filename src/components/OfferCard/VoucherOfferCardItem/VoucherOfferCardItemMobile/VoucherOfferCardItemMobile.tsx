/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useState } from 'react';
import Model from '@tripian/model';
import moment from 'moment';
import ImgLazy from '../../../base/ImgLazy/ImgLazy';
import Button from '../../../base/Button/Button';
import PreLoading from '../../../base/PreLoading/PreLoading';
import CustomPopover from '../../../base/CustomPopover/CustomPopover';
import OfferAvailableDaySelect from '../../../OfferAvailableDaySelect/OfferAvailableDaySelect';
import classes from './VoucherOfferCardItemMobile.scss';

interface IVoucherOfferCardItemMobile {
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

const VoucherOfferCardItemMobile: React.FC<IVoucherOfferCardItemMobile> = ({ offer, poiImage, poiName, optedIn, isMyOffer, isLoadingOffer, optClicked, cardClicked, redeemClicked }) => {
  const [show, setShow] = useState<boolean>(false);

  const ref = React.createRef<HTMLButtonElement>();

  moment.locale(window.twindow.langCode);

  const claimButton = useMemo(
    () => (
      <CustomPopover
        ref={ref}
        show={show}
        positions={['bottom', 'left', 'right']}
        content={<OfferAvailableDaySelect timeframe={offer.timeframe} selectedDay={(day: string) => optClicked(true, offer.id, day)} close={() => setShow(false)} />}
        backdropClick={(e) => {
          e.stopPropagation();
          setShow(false);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (optedIn) optClicked(false, offer.id);
            else setShow(!show);
          }}
          key={poiName}
          className={classes.offerButton}
          role="button"
          onKeyDown={() => {}}
          tabIndex={0}
        >
          {!optedIn ? `Claim ${offer.currency}${offer.discount}` : 'Cancel'}
        </div>
      </CustomPopover>
    ),
    [offer.currency, offer.discount, offer.id, offer.timeframe, optClicked, optedIn, poiName, ref, show],
  );

  return (
    <div className={classes.offerCard}>
      <div
        className={classes.offerCardImgGeneral}
        onClick={(event) => {
          event.stopPropagation();
          if (cardClicked) cardClicked();
        }}
        role="button"
        onKeyDown={() => {}}
        tabIndex={0}
      >
        <ImgLazy src={poiImage} alt={poiName || ''} objectFit="cover" className={classes.offerCardImage} x={256} y={256} />
        <div className={classes.offerCardCampaignName}>
          <div className={classes.offerCardCampaignNameText}>{offer.campaign?.title}</div>
        </div>
      </div>
      <div className={classes.offerCardBottom}>
        {poiName && (
          <div
            className={classes.offerCardName}
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
        )}
        <div className={classes.offerCardTitle}>{offer.title}</div>
        <div className={classes.offerType}>{offer.productType.name.toUpperCase()}</div>

        {offer && (
          <>
            <div className={classes.offerCardCaption}>
              {/* <div className={classes.exclamationIcon}>
              <Exclamation fill="var(--primary-color)" size="large" />
            </div> */}
              <div className={classes.offerDesc}>{offer.description}</div>
            </div>
            <div className={classes.offerCardCaption}>
              {/* <div className={classes.exclamationIcon}>
              <Exclamation fill="var(--primary-color)" size="large" />
            </div> */}
              <div className={classes.offerDesc}>{offer.campaign?.description}</div>
            </div>
          </>
        )}

        {offer?.optInDate && isMyOffer ? (
          <div className={classes.offerCardDate}>Opt-In Date: {moment(offer.optInDate).format('DD MMMM h:mm A')}</div>
        ) : (
          <div className={classes.offerCardDate}>
            Offer Valid {moment(offer?.timeframe?.start).format('MMM Do')} - {moment(offer?.timeframe?.end).format('MMM Do')}
          </div>
        )}

        {isLoadingOffer(offer.id) ? (
          <div className={classes.loadingWrapper}>
            <PreLoading color="#fff" size="small" />
          </div>
        ) : (
          <div className={classes.offerButtonsContent}>
            {offer.redeemDate === null ? (
              <>
                {optedIn ? <Button onClick={redeemClicked} className={classes.offerButton} text="Redeem" /> : null}
                {claimButton}
              </>
            ) : (
              <div className={classes.redeemed}>Redeemed at {moment(offer.redeemDate).format('MMM Do')}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoucherOfferCardItemMobile;
