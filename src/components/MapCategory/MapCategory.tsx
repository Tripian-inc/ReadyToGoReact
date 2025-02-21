/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Model from '@tripian/model';
import classes from './MapCategory.scss';

interface IMapCategory {
  categoryGroups?: Model.PoiCategoryGroup[];
  selectedPoiCategoryIds: number[];
  setSelectedPoiCategoryIds: (newIndex: number[]) => void;
  clearCategories: () => void;
  t: (value: Model.TranslationKey) => string;
}

const MapCategory: React.FC<IMapCategory> = ({ categoryGroups, selectedPoiCategoryIds, setSelectedPoiCategoryIds, clearCategories }) => {
  const [showClearButton, setShowClearButton] = useState(false);

  const handleCategoryGroupChange = (categoryGroup: Model.PoiCategoryGroup) => {
    const allSelected = categoryGroup.categories.every((category: Model.PoiCategory) => selectedPoiCategoryIds.includes(category.id));
    const updatedSelectedIds = allSelected
      ? selectedPoiCategoryIds.filter((id) => !categoryGroup.categories.some((category) => category.id === id))
      : [...selectedPoiCategoryIds, ...categoryGroup.categories.filter((category) => !selectedPoiCategoryIds.includes(category.id)).map((category) => category.id)];
    setSelectedPoiCategoryIds(updatedSelectedIds);
    setShowClearButton(true);
  };

  return (
    <ul className={classes.categoryList}>
      {showClearButton && selectedPoiCategoryIds.length > 0 && (
        <li>
          <div
            className={classes.button}
            onClick={() => {
              setShowClearButton(false);
              clearCategories();
            }}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            CLEAR ALL
          </div>
        </li>
      )}
      {categoryGroups &&
        categoryGroups
          .sort((a: Model.PoiCategoryGroup, b: Model.PoiCategoryGroup) => a.name.localeCompare(b.name))
          .map((categoryGroup) => (
            <li className={`${classes.category} ${categoryGroup.categories.every((category) => selectedPoiCategoryIds.includes(category.id)) ? classes.selectedCategory : ''}`} key={categoryGroup.name}>
              <label>
                <input className={classes.categoryInput} type="checkbox" checked={categoryGroup.categories.every((category) => selectedPoiCategoryIds.includes(category.id))} onChange={() => handleCategoryGroupChange(categoryGroup)} />
                {categoryGroup.name}
              </label>
            </li>
          ))}
    </ul>
  );
};

export default MapCategory;
