/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';

import { CheckboxChecked, CheckboxUnChecked } from '../Svg/Icons/Checkbox';
import classes from './CheckboxTree.scss';
import Checkbox from '../Checkbox/Checkbox';
import { ChevronDown, ChevronUp } from '../Svg/Icons';

interface ICheckboxTree {
  domId: string;
  text: string;
  subOptions: Array<Model.SubAnswer>;
  style?: React.CSSProperties;
  checkeds: Array<number>;
  onChangeParent: (checked: boolean, domId: string) => void;
  onChangeChild: (checked: boolean, domId: string) => void;
}

const CheckboxTree: React.FC<ICheckboxTree> = ({ domId, text, subOptions, style, checkeds, onChangeParent, onChangeChild }) => {
  const handleCheckboxOnChangeParent = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeParent(event.target.checked, event.target.name);
  };

  const handleCheckboxOnChangeChild = (checkedChild: boolean, domIdChild: string) => {
    onChangeChild(checkedChild, domIdChild);
  };

  const checkedParent = checkeds.includes(+domId);

  const memoizedUniqueDomId = useMemo(() => `checkbox_${domId}_${Math.random()}`, [domId]);

  return (
    <>
      <label className={classes.checkboxTree} htmlFor={memoizedUniqueDomId} style={style}>
        <span className={classes.span1}>
          <input id={memoizedUniqueDomId} name={domId} type="checkbox" checked={checkedParent} onChange={handleCheckboxOnChangeParent} />
          {checkedParent ? <CheckboxChecked className={classes.checked} /> : <CheckboxUnChecked />}
        </span>
        <span className={classes.span2}>{text}</span>
        {subOptions.length > 0 && <span className={classes.arrowIcon}>{checkedParent ? <ChevronUp /> : <ChevronDown />}</span>}
      </label>

      {checkedParent && subOptions.length > 0 ? (
        <div className={classes.subOptionsContainer}>
          {subOptions.map((subOption) => (
            <Checkbox key={subOption.id} domId={subOption.id.toString()} text={subOption.name} checked={checkeds.includes(subOption.id)} onChange={handleCheckboxOnChangeChild} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default CheckboxTree;
