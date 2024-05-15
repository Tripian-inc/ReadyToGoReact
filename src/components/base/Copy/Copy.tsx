/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model from '@tripian/model';
import classes from './Copy.scss';

interface ICopy {
  copyText: string;
  t: (value: Model.TranslationKey) => string;
}

const Copy: React.FC<ICopy> = ({ copyText, t }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(t('trips.myTrips.itinerary.step.poi.address.copied'));
      setTimeout(() => {
        setCopySuccess('');
      }, 1000);
    } catch (err) {
      setCopySuccess(t('trips.myTrips.itinerary.step.poi.address.failed'));
    }
  };
  return (
    <div className={classes.copy} role="button" tabIndex={0} onKeyPress={() => {}} onClick={() => copyToClipBoard(copyText)}>
      {copySuccess ? t('trips.myTrips.itinerary.step.poi.address.copied') : t('trips.myTrips.itinerary.step.poi.address.copy')}
    </div>
  );
};

export default Copy;
