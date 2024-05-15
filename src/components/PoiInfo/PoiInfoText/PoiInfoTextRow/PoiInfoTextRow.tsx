import React from 'react';
import classes from './PoiInfoTextRow.scss';

type Props = {
  children: React.ReactElement | React.ReactElement[] | null;
  border?: boolean;
  height?: string | number;
};

const PoiInfoTextRow: React.FC<Props> = ({ children, border = true, height = '50px' }) => (
  <div className={border ? classes.poiInfoTextRowBox : classes.poiInfoTextRowNoBox} style={{ height }}>
    {children}
  </div>
);

export const PoiInfoTextRowHeader: React.FC<{ header: string }> = ({ header }) => <span className={classes.poiInfoTextRowText}>{header}</span>;

export default PoiInfoTextRow;
