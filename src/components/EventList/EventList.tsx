/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model from '@tripian/model';
import EventCard from '../EventCard/EventCard';
import PlaceDetailsModal from '../PlaceDetailsModal/PlaceDetailsModal';
import classes from './EventList.scss';

type Props = {
  events: Model.CityEvent[];
  t: (value: Model.TranslationKey) => string;
};

const EventList: React.FC<Props> = ({ events, t }) => {
  const [selectedEvent, setSelectedEvent] = useState<Model.CityEvent | null>(null);

  const handleEventSelect = (event: Model.CityEvent) => {
    if (selectedEvent?.id === event.id) {
      setSelectedEvent(null);
      return;
    }
    setSelectedEvent(event);
  };

  return (
    <div className={classes.eventList}>
      {events.map((event) => (
        <div key={event.id} onKeyDown={() => {}} role="button" tabIndex={0} onClick={() => handleEventSelect(event)} className={`${classes.eventItem} ${selectedEvent?.id === event.id ? classes.eventItemSelected : classes.eventItemHover}`}>
          <EventCard title={event.title} image={event.image} date={event.date} venue={event.venue} />
        </div>
      ))}

      {selectedEvent && <PlaceDetailsModal isOpen={Boolean(selectedEvent)} onClose={() => setSelectedEvent(null)} event={selectedEvent} t={t} />}
    </div>
  );
};

export default EventList;
