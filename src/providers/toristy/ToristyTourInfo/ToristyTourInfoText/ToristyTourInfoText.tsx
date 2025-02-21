/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { Providers } from '@tripian/model';
import classes from './ToristyTourInfoText.scss';

interface IToristyTourInfoText {
  tour: Providers.Toristy.ProductDetails;
}

const ToristyTourInfoText: React.FC<IToristyTourInfoText> = ({ tour }) => (
  <>
    <div className={classes.gygTourInfoText}>
      {tour.description && (
        <div className="row">
          <div className="col col12" dangerouslySetInnerHTML={{ __html: tour.description }} />
        </div>
      )}

      {tour.included && (
        <>
          <hr className="mb6" style={{ opacity: 0.2 }} />
          <div className="row mb0">
            <div className="col col12">
              <h3>What&apos;s included?</h3>
              <div dangerouslySetInnerHTML={{ __html: tour.included }} />
            </div>
          </div>
        </>
      )}
      {tour.excluded && (
        <div className="row mb0">
          <div className="col col12">
            <h3>What&apos;s excluded?</h3>
            <div dangerouslySetInnerHTML={{ __html: tour.excluded }} />
          </div>
        </div>
      )}

      {tour.cancellation_text && (
        <div className="row mb0">
          <div className="col col12">
            <h3>Cancellation Policy</h3>
            <div dangerouslySetInnerHTML={{ __html: tour.cancellation_text }} />
          </div>
        </div>
      )}
    </div>
  </>
);

export default ToristyTourInfoText;
