/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import classes from './TabMenu.scss';

interface ITabMenuItem {
  title: string;
  onClick: () => void;
}

interface ITabMenu {
  menuItems: ITabMenuItem[];
  selectedIndex?: number;
}

const TabMenu: React.FC<ITabMenu> = ({ menuItems, selectedIndex = 0 }) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(selectedIndex);

  return (
    <>
      <div className={classes.tabMenu}>
        {menuItems.map((menuItem, index) => {
          const menuItemTextClasses = [classes.tabMenuItemText];
          if (selectedMenuIndex === index) menuItemTextClasses.push(classes.selected);
          return (
            <div
              key={`tab_menu_item_${index.valueOf()}_${Math.random()}`}
              role="button"
              tabIndex={0}
              className={classes.tabMenuItem}
              onClick={() => {
                setSelectedMenuIndex(index);
                menuItem.onClick();
              }}
              onKeyDown={() => {}}
            >
              <div className={menuItemTextClasses.join(' ')}>{menuItem.title}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TabMenu;
