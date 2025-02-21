/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import moment from 'moment';
import ImgLazy from '../base/ImgLazy/ImgLazy';
import Modal from '../base/Modal/Modal';
import XIcon from '../base/Svg/Icons/X';
import StarIcon from '../base/Svg/Icons/Star';
import MapPinIcon from '../base/Svg/Icons/MapPin';
import Calendar2Icon from '../base/Svg/Icons/Calendar2';
import Clock2Icon from '../base/Svg/Icons/Clock2';
import MusicIcon from '../base/Svg/Icons/Music';
import Link2Icon from '../base/Svg/Icons/Link2';
import classes from './PlaceDetailsModal.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  event: Model.CityEvent;
  t: (value: Model.TranslationKey) => string;
};

const PlaceDetailsModal: React.FC<Props> = ({ isOpen, onClose, event, t }) => {
  if (!isOpen) return null;

  const startDate = moment(event.date.startDateTime).format('MMM D, HH:mm');
  const endDate = moment(event.date.endDateTime).format('MMM D, HH:mm');

  return (
    <Modal show={isOpen} backdropClick={onClose} className={classes.placeDetailsModal}>
      <div className={classes.modalContent}>
        <div className={classes.modalImageWrapper}>
          <ImgLazy src={event.image} objectFit="contain" alt={event.title} />
          <button onClick={onClose} className={classes.closeButton}>
            <XIcon className={classes.closeIcon} />
          </button>
          <div className={classes.ratingBadge}>
            <StarIcon className={classes.starIcon} />
            <span className={classes.ratingText}>{event.venue.rating}</span>
            <span className={classes.reviewText}>
              ({event.venue.reviews} {t('common.reviews')})
            </span>
          </div>
        </div>

        <div className={classes.modalBody}>
          <div>
            <h2 className={classes.eventTitle}>{event.title}</h2>
            <div className={classes.eventInfo}>
              <div className={classes.eventInfoItem}>
                <MapPinIcon className={classes.infoIcon} />
                <span>{event.address}</span>
              </div>
              <div className={classes.eventInfoItem}>
                <Calendar2Icon className={classes.infoIcon} />
                <span>{`${startDate} - ${endDate}`}</span>
              </div>
            </div>
          </div>

          <div className={classes.detailsGrid}>
            <div className={classes.detailItem}>
              <div className={classes.detailLabel}>
                <Clock2Icon className={classes.infoIcon} />
                <span className={classes.labelText}>{t('cityInfo.events.startTime')}</span>
              </div>
              <p className={classes.detailValue}>{event.date.startDateTime.split(' ')[1]}</p>
            </div>
            <div className={classes.detailItem}>
              <div className={classes.detailLabel}>
                <MusicIcon className={classes.infoIcon} />
                <span className={classes.labelText}>{t('cityInfo.events.venue')}</span>
              </div>
              <p className={classes.detailValue}>{event.venue.name}</p>
            </div>
          </div>

          <div className={classes.section}>
            <h3 className={classes.sectionTitle}>{t('cityInfo.events.about')}</h3>
            <p className={classes.sectionText}>{event.description}</p>
          </div>

          <div className={classes.section}>
            <h3 className={classes.sectionTitle}>{t('cityInfo.events.getTickets')}</h3>
            <div className={classes.ticketGrid}>
              {event.ticketInfo.map((ticket, index) => (
                <a key={index} href={ticket.link} target="_blank" rel="noopener noreferrer" className={classes.ticketItem}>
                  <div className={classes.ticketSource}>
                    <Link2Icon width="20" height="20" />
                    <span className={classes.ticketSourceText}>{ticket.source}</span>
                  </div>
                  <span className={classes.buyTicketsText}>{t('cityInfo.events.buyTickets')}</span>
                </a>
              ))}
            </div>
          </div>

          {event.venue.link && (
            <div className={classes.mapLinkWrapper}>
              <a href={event.venue.link} target="_blank" rel="noopener noreferrer" className={classes.mapLink}>
                <MapPinIcon className={classes.infoIcon} />
                {t('cityInfo.events.viewOnMaps')}
              </a>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PlaceDetailsModal;
