/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';
import Model, { helper } from '@tripian/model';
import PreLoading from '../base/PreLoading/PreLoading';
import classes from './SearchThisArea.scss';

interface ISearchThisArea {
  categoryList?: Model.PoiCategory[];
  searchPoi: (categoryIds: number[]) => Promise<Model.Poi[]>;
  searchPoiCallBack: (pois: Model.Poi[]) => void;
  clearPois: () => void;
  hide: boolean;
  t: (value: Model.TranslationKey) => string;
}

const SearchThisArea: React.FC<ISearchThisArea> = ({ hide, categoryList, searchPoi, searchPoiCallBack, clearPois, t }) => {
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clearButtonText, setClearButtonText] = useState<string>();

  const selectList = (categoryIds: number[]) => {
    setLoading(true);
    searchPoi(categoryIds).then((pois: Model.Poi[]) => {
      setClearButtonText(`${t('trips.myTrips.itinerary.searchThisArea.clear')} (${pois.length})`);
      searchPoiCallBack(pois);
      setLoading(false);
      setShowClearButton(true);
    });
  };

  const translate = useCallback(
    (group: Model.POI_CATEGORY_GROUP) => {
      switch (group) {
        case Model.POI_CATEGORY_GROUP.ATTRACTION:
          return t('trips.myTrips.exploreMore.categories.attractions');
        case Model.POI_CATEGORY_GROUP.CAFE:
          return t('trips.myTrips.exploreMore.categories.cafes');
        case Model.POI_CATEGORY_GROUP.NIGHTLIFE:
          return t('trips.myTrips.exploreMore.categories.nightlife');
        case Model.POI_CATEGORY_GROUP.RESTAURANT:
          return t('trips.myTrips.exploreMore.categories.restaurants');
        case Model.POI_CATEGORY_GROUP.SHOPPING:
          return t('trips.myTrips.exploreMore.categories.shopping');
        default:
          return t('trips.myTrips.exploreMore.categories.unknown');
      }
    },
    [t],
  );

  if (loading) {
    return <PreLoading size="small" />;
  }

  return (
    <>
      <div style={hide && !showClearButton ? { display: 'none' } : {}}>
        {showClearButton ? (
          <div
            className={classes.button}
            onClick={() => {
              clearPois();
              setShowClearButton(false);
            }}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            {clearButtonText}
          </div>
        ) : (
          <div
            className={classes.button}
            onClick={() => {
              setShowCategoryList(!showCategoryList);
            }}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            {showCategoryList ? t('trips.myTrips.itinerary.searchThisArea.cancel') : t('trips.myTrips.itinerary.searchThisArea.title')}
          </div>
        )}
        {showCategoryList ? (
          <ul className={classes.categoryList}>
            {helper.getCategoryGroups(categoryList).map((categoryGroup) => (
              <li
                className={classes.category}
                onKeyPress={() => {}}
                role="presentation"
                key={categoryGroup.group}
                // value={categoryGroup.id}
                onClick={() => {
                  setShowCategoryList(false);
                  selectList(categoryGroup.ids);
                }}
              >
                {translate(categoryGroup.group)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default SearchThisArea;
