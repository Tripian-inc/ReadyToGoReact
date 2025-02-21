/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import Model from '@tripian/model';
import { RSelectOption } from '../base/RSelect/RSelect';
import RSelectMultiCustom from '../base/RSelectMultiCustom/RSelectMultiCustom';
import classes from './PoiCategories.scss';

interface IPoiCategories {
  categoryGroups: Model.PoiCategoryGroup[];
  selectedPoiCategoryGroups: Model.PoiCategoryGroup[];
  setSelectedPoiCategoryGroups: (newPoiCategoryGroups: Model.PoiCategoryGroup[]) => void;
  t: (value: Model.TranslationKey) => string;
}

const PoiCategories: React.FC<IPoiCategories> = ({ categoryGroups, selectedPoiCategoryGroups, setSelectedPoiCategoryGroups, t }) => {
  const poiCategoryOptions = useMemo(() => {
    const options = categoryGroups.map((categoryOption: Model.PoiCategoryGroup) => ({
      value: categoryOption.categories.map((category: Model.PoiCategory) => category.id).join(','),
      label: categoryOption.name,
    }));
    return options;
  }, [categoryGroups]);

  const selectedValues: string[] = selectedPoiCategoryGroups.map((x) => x.categories.map((category: Model.PoiCategory) => category.id).join(','));

  const callBackRSelect = (selectedOptions: RSelectOption[]) =>
    setSelectedPoiCategoryGroups(
      selectedOptions.map((selectedOption: RSelectOption) => ({
        name: selectedOption.label,
        categories: selectedOption.value.split(',').map((item) => ({
          id: parseInt(item.trim(), 10),
          name: '',
          isCustom: false,
        })),
      })),
    );

  return (
    <div className={classes.poiCategories}>
      <RSelectMultiCustom options={poiCategoryOptions} selectedOptionValues={selectedValues} onSelectedOptionChange={callBackRSelect} placeHolder={t('trips.myTrips.exploreMore.selectCategory')} isSelectAll />
    </div>
  );
};

export default PoiCategories;
