/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model from '@tripian/model';
import moment from 'moment';
import ImgLazy from '../../../base/ImgLazy/ImgLazy';
import PreLoading from '../../../base/PreLoading/PreLoading';
import CustomPopover from '../../../base/CustomPopover/CustomPopover';
import OfferAvailableDaySelect from '../../../OfferAvailableDaySelect/OfferAvailableDaySelect';
import classes from './VoucherOfferCardItemDesktop.scss';

interface IVoucherOfferCardItemDesktop {
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

const VoucherOfferCardItemDesktop: React.FC<IVoucherOfferCardItemDesktop> = ({ offer, poiImage, poiName, optedIn, isMyOffer, isLoadingOffer, optClicked, cardClicked, redeemClicked }) => {
  const [show, setShow] = useState<boolean>(false);

  const ref = React.createRef<HTMLButtonElement>();

  moment.locale(window.twindow.langCode);

  const claimButton = () => {
    if (!isLoadingOffer(offer.id)) {
      if (optedIn) {
        return (
          <div
            className={classes.optInText}
            onClick={(e) => {
              e.stopPropagation();
              if (optedIn) optClicked(false, offer.id);
              else optClicked(true, offer.id);
            }}
            role="button"
            onKeyDown={() => {}}
            tabIndex={0}
          >
            Cancel
          </div>
        );
      }
      return (
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
            className={classes.optInText}
            onClick={() => {
              if (optedIn) optClicked(false, offer.id);
              else {
                setShow(!show);
              }
            }}
            role="button"
            key={poiName}
            onKeyDown={() => {}}
            tabIndex={0}
          >
            Claim Now
          </div>
        </CustomPopover>
      );
    }
    return (
      <div className={classes.loadingWrapper}>
        <PreLoading color="#fff" size="small" />
      </div>
    );
  };

  return (
    <>
      <div className={classes.offerCard}>
        <div className={classes.offerCardGeneralLeft}>
          <div className={classes.offerCardImgGeneral}>
            {offer.campaign && <div className={classes.offerCardCampaignName}>{offer.campaign.title}</div>}
            <div
              className={classes.offerCardImg}
              onClick={(event) => {
                event.stopPropagation();
                if (cardClicked) cardClicked();
              }}
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
            >
              <ImgLazy src={poiImage} alt={poiName || ''} className={classes.offerCardImage} classNameLazyLoading={classes.offerCardImageLazyLoading} x={256} y={256} />
            </div>
          </div>
        </div>

        <div className={classes.offerCardGeneralMid}>
          <div className={classes.offerCardTop}>
            <div className={classes.middle}>
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
            </div>
            <div className={classes.offerDiscountWrapper}>
              <div style={{ fontWeight: 600 }} className={classes.offerCardCoupon}>
                {offer.currency}
                {offer.discount}
              </div>
              <div className={classes.offerCardButtons}>{offer.redeemDate === null ? claimButton() : <div className={classes.redeemed}>Redeemed at {moment(offer.redeemDate).format('MMM Do')}</div>}</div>
            </div>
          </div>

          {offer && (
            <>
              <div className={classes.offerCardCaption}>
                <div className={classes.offerCardDescContent}>
                  {/* <div className={classes.exclamationIcon}>
                    <Exclamation fill="var(--primary-color)" size="large" />
                  </div> */}
                  <div className={classes.offerDesc}>{offer.description}</div>
                </div>
              </div>
              <div className={classes.offerCardCaption}>
                <div className={classes.offerCardDescContent}>
                  {/* <div className={classes.exclamationIcon}>
                    <Exclamation fill="var(--primary-color)" size="large" />
                  </div> */}
                  <div className={classes.offerDesc}>{offer.campaign?.description}</div>
                </div>
              </div>
            </>
          )}
          <div className={classes.offerCardTimeFrame}>
            {offer?.optInDate && isMyOffer ? (
              <span className={classes.date}>Opt-In Date: {moment(offer.optInDate).format('DD MMMM h:mm A')}</span>
            ) : (
              <span className={classes.date}>
                Offer Valid {moment(offer?.timeframe?.start).format('MMM Do')} - {moment(offer?.timeframe?.end).format('MMM Do')}
              </span>
            )}
          </div>
          <div className={classes.offerType}>{offer.productType.name.toUpperCase()}</div>
        </div>
      </div>
    </>
  );
};

export default VoucherOfferCardItemDesktop;
