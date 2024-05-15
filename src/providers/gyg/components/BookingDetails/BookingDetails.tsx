/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers, helper } from '@tripian/model';
import moment from 'moment';
import ImgLazy from '../../../../components/base/ImgLazy/ImgLazy';
import classes from './BookingDetails.scss';

interface IBookingDetails {
  bookingInfo: Providers.Gyg.TourReservationDetails;
}

const BookingDetails: React.FC<IBookingDetails> = ({ bookingInfo }) => {
  const bookingImage: string = helper.getYourGuideImageFormat(bookingInfo.data.shopping_cart.tour_image, '80');
  // const resizedImg: string = helper.imgUrl(bookingImage, 800);

  moment.locale(window.twindow.langCode);

  return (
    <div className={`row center ${classes.bookingDetailsPage}`}>
      <h3 className="col col12">Booking Information</h3>
      <div className="col col12 col6-m">
        <ImgLazy className={classes.bookingDetailImg} src={bookingImage} alt="" x={800} y={800} />
      </div>
      <div className="col col12 col6-m">
        <ul>
          <li>
            <div className={classes.detailHeader}>Tour</div>
            <span className={classes.detailDot}> :</span>
            <div className={classes.detailContent}>{bookingInfo.data.shopping_cart.tour_name}</div>
          </li>
          <li>
            <div className={classes.detailHeader}>Name</div>
            <span className={classes.detailDot}> :</span>
            <div className={classes.detailContent}>
              {bookingInfo.data.shopping_cart.traveler.first_name} {bookingInfo.data.shopping_cart.traveler.last_name}
            </div>
          </li>
          <li>
            <div className={classes.detailHeader}>E-mail</div>
            <span className={classes.detailDot}> :</span>
            <div className={classes.detailContent}>{bookingInfo.data.shopping_cart.traveler.email}</div>
          </li>
          <li>
            <div className={classes.detailHeader}>Phone</div>
            <span className={classes.detailDot}> :</span>
            <div className={classes.detailContent}>{bookingInfo.data.shopping_cart.traveler.phone_number}</div>
          </li>
          <li>
            <div className={classes.detailHeader}>Date</div>
            <span className={classes.detailDot}> :</span>
            <div className={classes.detailContent}>{`${moment(bookingInfo.data.shopping_cart.bookings[0].bookable.datetime).format('YYYY-MM-DD HH:mm:ss')}`}</div>
          </li>
          <li>
            <div className={classes.detailHeader}>Travelers</div>
            <span className={classes.detailDot}> :</span>
            <div className={classes.detailContent}>{bookingInfo.data.shopping_cart.bookings.length === 1 ? '1 person' : `${bookingInfo.data.shopping_cart.bookings.length} people`}</div>
          </li>
          <li>
            <div className={classes.detailHeader}>Cancel Policy</div>
            <span className={classes.detailDot}> :</span>
            <div className={classes.detailContent}>{bookingInfo.data.shopping_cart.bookings[0].bookable.cancellation_policy_text}</div>
          </li>
          {bookingInfo.data.shopping_cart.bookings && bookingInfo.data.shopping_cart.bookings[0].ticket && (
            <li>
              <div className={classes.detailHeader}>Link to Ticket</div>
              <span className={classes.detailDot}> :</span>
              <div className={classes.detailContent}>
                <a className={classes.detailUrl} rel="noopener noreferrer" target="_blank" href={bookingInfo.data.shopping_cart.bookings[0].ticket.ticket_url || ''}>
                  Details
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookingDetails;
