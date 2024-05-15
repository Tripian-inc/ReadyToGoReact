/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import classes from './BbAccommodationInfo.scss';
import CloseIconButton from '../../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import Address from '../../../../components/base/Svg/Icons/Address';
import Copy from '../../../../components/base/Copy/Copy';
import ShowMoreLess from '../../../../components/base/ShowMoreLess/ShowMoreLess';

interface IBbAccommodationInfo {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  hotelOffer: Providers.Bb.SearchAccommodationHotelOffer;
  onBookNow: (url: string) => void;
  onAddToItinerary: (accommodation: Model.Accommodation) => void;
  close: () => void;
  t: (value: Model.TranslationKey) => string;
}

const BbAccommodationInfo: React.FC<IBbAccommodationInfo> = ({ checkIn, checkOut, adults, children, hotelOffer, onBookNow, onAddToItinerary, close, t }) => {
  const supplierClassifications = hotelOffer.info.hotelClassifications.map((hc) => hc.supplierClassificationName);
  const supplierServices = hotelOffer.info.hotelServices.map((hs) => hs.supplierServiceName);
  return (
    <div className={classes.bbAccommodationInfo}>
      <div className={classes.bbAccommodationImage}>
        <img src={hotelOffer.info.mainImageUrl} alt={hotelOffer.info.name} referrerPolicy="no-referrer" />
      </div>

      <div>
        <div className="row py1">
          <h3 className={classes.title}>
            {hotelOffer.info.name} ({hotelOffer.info.type})
          </h3>
          <div className={`col col12 ${classes.bbAccommodationTextRowBox}`}>
            <div className={classes.bbAccommodationAddress}>
              <div className={classes.addressIcon}>
                <Address size="1rem" />
              </div>
              <span>{`${hotelOffer.info.address}, ${hotelOffer.info.cityName}`}</span>
            </div>
            <Copy copyText={`${hotelOffer.info.address}, ${hotelOffer.info.cityName}`} t={t} />
          </div>
          {hotelOffer.info.hotelClassifications.length > 0 && (
            <div className="col col12 px0">
              <h4 className={classes.bbAccommodationHeaderText}>Classifications:</h4>
              <ShowMoreLess items={supplierClassifications} defaultItemCount={3} t={t} />
            </div>
          )}
          {hotelOffer.info.hotelServices.length > 0 && (
            <div className="col col12 px0">
              <h4 className={classes.bbAccommodationHeaderText}>Services:</h4>
              <ShowMoreLess items={supplierServices} defaultItemCount={5} t={t} />
            </div>
          )}

          {/* {hotelOffer.roomOffers.map((roomOffer: Providers.Bb.SearchAccommodationRoomOffer) => {
        const guestAdult = roomOffer.guests.adults;
        const adultsCount = Math.max(adults, guestAdult);
        const hotelBbUrl = `https://bookbarbados.com/hotel-processing-page/accommodation-details/?packageoptions=accommodation&type=accommodation&cityCode=166991&cityID=166991&rooms=1&hotelCode=${hotelOffer.info.hotelCode}&supplierCode=${hotelOffer.info.supplierCode}&offer=${roomOffer.offerKey}&check-in=${checkIn}&check-out=${checkOut}&adults=${adultsCount}&children=${children}`;
        return (
          <>
            <div className="col col12">
              <div className={classes.roomOffer}>
                <h5>Offer Key: {roomOffer.offerKey}</h5>
                <h5>Room Type: {roomOffer.info.roomType}</h5>
                <h5>
                  {roomOffer.info.bedroomsQuantity} Bedrooms, {roomOffer.info.bathroomsQuantity} Bathrooms
                </h5>
                {roomOffer.info.bedTypes.map((bt) => (
                  <h5>{`${bt.quantity} ${bt.type}`}</h5>
                ))}
                <div dangerouslySetInnerHTML={{ __html: roomOffer.info.roomTypeDescription }} />
                <h5>Room Services:</h5>
                {roomOffer.roomServices.map((rs) => (
                  <span className={classes.tag}>{rs}</span>
                ))}
                <h5>Available Rooms: {roomOffer.availableRooms}</h5>
                <h5>Adults: {guestAdult}</h5>
                {roomOffer.salesTerms.map((st, i) => (
                  <h5>{`Price ${i + 1}: ${st.price.amount} ${st.price.currency}`}</h5>
                ))}
                {roomOffer.cancellations &&
                  roomOffer.cancellations
                    .filter((c) => c.noShow === false)
                    .map((cc) => (
                      <h5>
                        Cancellation {`${cc.dateFrom || ''}   - ${cc.dateTo || ''}`}: {`${cc.convertedPrice.amount} ${cc.convertedPrice.currency}`}
                      </h5>
                    ))}
                <div className="col col12 center mb0">
                  <Button
                    text="Book Now"
                    color="danger"
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('Selected hotel offer url : ', hotelBbUrl);
                      onBookNow(roomOffer, hotelBbUrl);
                    }}
                    style={{ minWidth: '10rem' }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      })} */}
        </div>
      </div>
      <div className={classes.bbAccommodationBottom}>
        <button
          type="button"
          className={classes.bbAccommodationPrimaryButton}
          onClick={() => {
            const hotelBbUrl = `https://bookbarbados.com/hotel-processing-page/accommodation-details/?packageoptions=accommodation&type=accommodation&cityCode=${hotelOffer.info.cityCode}&cityID=${hotelOffer.info.cityId}&rooms=1&hotelCode=${hotelOffer.info.hotelCode}&supplierCode=${hotelOffer.info.supplierCode}&offer=&check-in=${checkIn}&check-out=${checkOut}&adults=${adults}&children=${children}&site=TRIPIAN`;
            // eslint-disable-next-line no-console
            // console.log('onBookNow:', hotelBbUrl);
            onBookNow(hotelBbUrl);
          }}
        >
          View Deals
        </button>

        <button
          type="button"
          className={classes.bbAccommodationSecondaryButton}
          onClick={() => {
            const accommodation: Model.Accommodation = {
              name: hotelOffer.info.name,
              address: `${hotelOffer.info.address}, ${hotelOffer.info.cityName}, ${hotelOffer.info.countryName}`,
              coordinate: { lat: Number(hotelOffer.info.latitude), lng: Number(hotelOffer.info.longitude) },
              provider: 'bookbarbados',
              refID: hotelOffer.info.hotelCode,
              imageUrl: hotelOffer.info.mainImageUrl,
            };
            // eslint-disable-next-line no-console
            // console.log('onAddToItinerary:', accommodation);
            onAddToItinerary(accommodation);
          }}
        >
          Add To Itinerary
        </button>
      </div>
      {/* <div className="center pb4">
      <b>Address:</b>
      {` ${hotelOffer.info.address}, ${hotelOffer.info.cityName}, ${hotelOffer.info.countryName}`}
    </div> */}
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

export default BbAccommodationInfo;
