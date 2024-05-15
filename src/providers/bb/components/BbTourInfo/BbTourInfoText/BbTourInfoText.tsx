/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers } from '@tripian/model';
import classes from './BbTourInfoText.scss';

interface IBbTourInfoText {
  activityInfo: Providers.Bb.ActivityInfo;
}

const BbTourInfoText: React.FC<IBbTourInfoText> = ({ activityInfo }) => (
  <>
    <div className={`row mb2 ${classes.tourInfoAlign}`}>
      <div className="col col12 col2-m">
        <h4>Themes</h4>
      </div>
      <div className="col col12 col10-m">
        {activityInfo.themes.map((theme, i) => (
          <div key={`theme-${Math.random()}`}>
            <li>{theme}</li>
            <br />
          </div>
        ))}
      </div>
    </div>
    <hr className="mb6" style={{ opacity: 0.2 }} />

    {activityInfo.fullDescription && (
      <div className="row mb2">
        <div className="col col12 col2-m">
          <h4>Full description</h4>
        </div>
        <div
          className="col col12 col10-m"
          dangerouslySetInnerHTML={{
            __html: `${activityInfo.fullDescription
              .replace(/\[tick]/g, '&#10004;')
              .replace(/\[no tick]/g, '&#10006;')
              .replace(/\[awards]/g, '')
              .replace(/_\|\|/g, ' ')
              .replace(/\|\|/g, ' ')}`,
          }}
        />
      </div>
    )}
  </>
);

export default BbTourInfoText;
