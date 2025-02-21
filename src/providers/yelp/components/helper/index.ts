/* eslint-disable import/no-extraneous-dependencies */
import Model, { helper } from '@tripian/model';

const peopleCountOptions = (t: (value: Model.TranslationKey) => string) => [
  { value: 1, label: `1 ${t('reservation.person')}` },
  { value: 2, label: `2 ${t('reservation.people')}` },
  { value: 3, label: `3 ${t('reservation.people')}` },
  { value: 4, label: `4 ${t('reservation.people')}` },
  { value: 5, label: `5 ${t('reservation.people')}` },
  { value: 6, label: `6 ${t('reservation.people')}` },
  { value: 7, label: `7 ${t('reservation.people')}` },
];

const yelpHourRangeOptions: Array<{ value: string }> = [];

helper.hourRange.forEach((h) => yelpHourRangeOptions.push({ value: `${h}:00` }));

export { peopleCountOptions, yelpHourRangeOptions };
