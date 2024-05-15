/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import Model from '@tripian/model';
import { RSelectOption } from '../base/RSelect/RSelect';
import RSelectMultiCustom from '../base/RSelectMultiCustom/RSelectMultiCustom';
import classes from './PoiCategories.scss';

interface IPoiCategories {
  selectedPoiCategoryIndexes: number[];
  setSelectedPoiCategoryIndexes: (newIndex: number[]) => void;
  t: (value: Model.TranslationKey) => string;
}

const PoiCategories: React.FC<IPoiCategories> = ({ selectedPoiCategoryIndexes, setSelectedPoiCategoryIndexes, t }) => {
  const poiCategoryOptions = useMemo(() => {
    const options = [
      { value: (0).toString(), label: t('trips.myTrips.exploreMore.categories.attractions') },
      { value: (1).toString(), label: t('trips.myTrips.exploreMore.categories.restaurants') },
      { value: (2).toString(), label: t('trips.myTrips.exploreMore.categories.cafes') },
      { value: (3).toString(), label: t('trips.myTrips.exploreMore.categories.nightlife') },
      { value: (4).toString(), label: t('trips.myTrips.exploreMore.categories.shopping') },
    ];
    return options;
  }, [t]);

  const selectedOptionValues: string[] = selectedPoiCategoryIndexes.map((x) => x.toString());

  const callBackRSelect = (selectedOptions: RSelectOption[]) => setSelectedPoiCategoryIndexes(selectedOptions.map((selectedOption) => Number(selectedOption.value)));

  return (
    <div className={classes.poiCategories}>
      <RSelectMultiCustom options={poiCategoryOptions} selectedOptionValues={selectedOptionValues} onSelectedOptionChange={callBackRSelect} placeHolder={t('trips.myTrips.exploreMore.selectCategory')} isSelectAll />
    </div>
  );
};

export default PoiCategories;
