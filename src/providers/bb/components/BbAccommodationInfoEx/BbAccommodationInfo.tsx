/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import classes from './BbAccommodationInfo.scss';
import CloseIconButton from '../../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import Button from '../../../../components/base/Button/Button';

interface IBbAccommodationInfo {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  hotelOffer: Providers.Bb.SearchAccommodationHotelOffer;
  onBookNow: (url: string) => void;
  onAddToItinerary: (accommodation: Model.Accommodation) => void;
  close: () => void;
}

const BbAccommodationInfo: React.FC<IBbAccommodationInfo> = ({ checkIn, checkOut, adults, children, hotelOffer, onBookNow, onAddToItinerary, close }) => (
  <div className={classes.bbAccommodationInfo}>
    <img src={hotelOffer.info.mainImageUrl} alt={hotelOffer.info.name} />
    <h3 className={classes.title}>
      {hotelOffer.info.name} ({hotelOffer.info.type})
    </h3>
    <div className="row py1">
      <div className="col col12">
        <b>Address:</b>
        {` ${hotelOffer.info.address}, ${hotelOffer.info.cityName}, ${hotelOffer.info.countryName}`}
      </div>
      {hotelOffer.info.hotelClassifications.length > 0 && (
        <div className="col col12">
          <h4>Classifications:</h4>
          {hotelOffer.info.hotelClassifications.length > 0 &&
            hotelOffer.info.hotelClassifications.map((hc, i) => (
              <span key={`${hc.otaCode}-${i}`} className={classes.tag}>
                {hc.supplierClassificationName}
              </span>
            ))}
        </div>
      )}
      {hotelOffer.info.hotelServices.length > 0 && (
        <div className="col col12">
          <h4>Services:</h4>
          {hotelOffer.info.hotelServices.map((hs, j) => (
            <span key={`${hs.supplierServiceName}-${j}`} className={classes.tag}>
              {hs.supplierServiceName}
            </span>
          ))}
        </div>
      )}
      <div className="col col12 col6-m">
        <Button
          text="VIEW DEALS"
          color="danger"
          onClick={() => {
            const hotelBbUrl = `https://bookbarbados.com/hotel-processing-page/accommodation-details/?packageoptions=accommodation&type=accommodation&cityCode=${hotelOffer.info.cityCode}&cityID=${hotelOffer.info.cityId}&rooms=1&hotelCode=${hotelOffer.info.hotelCode}&supplierCode=${hotelOffer.info.supplierCode}&offer=&check-in=${checkIn}&check-out=${checkOut}&adults=${adults}&children=${children}&site=TRIPIAN`;
            // eslint-disable-next-line no-console
            console.log('onBookNow:', hotelBbUrl);
            onBookNow(hotelBbUrl);
          }}
          style={{ width: '100%' }}
        />
      </div>
      <div className="col col12 col6-m">
        <Button
          text="ADD TO ITINERARY"
          color="secondary"
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
          style={{ width: '100%' }}
        />
      </div>
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

export default BbAccommodationInfo;
