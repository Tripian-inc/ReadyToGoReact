/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classes from './FlightCard.scss';

interface IFlightCard {
  airportName: string;
  arrivalTime: string;
  checkinDetail: { title: string; desc: string; airline: string };
}

const FlightCard: React.FC<IFlightCard> = ({ airportName, arrivalTime, checkinDetail }) => (
  <div className={classes.flightCard}>
    <figure className={classes.flightContent}>
      <div className={classes.flightImg} />
    </figure>
    <div className={classes.flightCardBody}>
      <h4>{checkinDetail.title}</h4>
      <div className={classes.flightInfo}>
        <span>{checkinDetail.airline}</span>
        <span>{checkinDetail.desc}</span>
        <span>
          <b>Arrival: </b>
          {arrivalTime}
        </span>
        <span>{airportName}</span>
      </div>
    </div>
  </div>
);

export default FlightCard;
