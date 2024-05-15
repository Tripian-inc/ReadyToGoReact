import React from 'react';
import 'external-svg-loader';
import classes from './InfoBox.scss';

type InfoBoxProps = {
  iconUrl: string;
  title: string;
  description: string;
};

const InfoBox: React.FC<InfoBoxProps> = ({ iconUrl, title, description }) => (
  <div className={classes.infoBox}>
    <div className={classes.infoBoxContent}>
      <div className={classes.infoIconContent}>
        <svg className={classes.infoIcon} data-src={iconUrl} fill="currentColor" />
      </div>
      <div className={classes.infoBoxTitle}>{title}</div>
      <div className={classes.infoBoxDesc}>{description}</div>
    </div>
  </div>
);
export default InfoBox;
