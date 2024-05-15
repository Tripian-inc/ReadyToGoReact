/* eslint-disable import/no-extraneous-dependencies */
import { helper } from '@tripian/model';

const peopleCountOptions = [
  { value: 1, label: '1 person' },
  { value: 2, label: '2 people' },
  { value: 3, label: '3 people' },
  { value: 4, label: '4 people' },
  { value: 5, label: '5 people' },
  { value: 6, label: '6 people' },
  { value: 7, label: '7 people' },
];

const yelpHourRangeOptions: Array<{ value: string }> = [];

helper.hourRange.forEach((h) => yelpHourRangeOptions.push({ value: `${h}:00` }));

export { peopleCountOptions, yelpHourRangeOptions };
