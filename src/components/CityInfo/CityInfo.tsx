/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import classes from './CityInfo.scss';
import TasteCard from '../TasteCard/TasteCard';
import ImgLazy from '../base/ImgLazy/ImgLazy';

interface ICityInfo {
  city: Model.City;
  poiCardClicked: (poi: Model.Poi) => void;
  fetchPois: (tasteId: number) => Promise<Model.Poi[]>;
}
const CityInfo: React.FC<ICityInfo> = ({ city, poiCardClicked, fetchPois }) => {
  const [poiList, setPoiList] = useState<Model.Poi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [poiListToggle, setPoiListToggle] = useState<boolean>(false);

  const cityImg = helper.cityImgUrl(`${city.image.url}`, 800, 800);

  const getRelationalPois = (tasteId: number) => {
    fetchPois(tasteId).then((currentPoiList) => {
      setLoading(false);
      setPoiList(currentPoiList);
    });
  };

  return (
    <div className={`${classes.cityContent} row mb0`}>
      <h2>{city.name}</h2>
      <div>{city.description}</div>
      <div className={`${classes.cityImageContent} col col12 col6-m p0 mb0`}>
        <div className={classes.cityImg}>
          {/* <img src={cityImg} alt="" /> */}
          <ImgLazy src={cityImg} alt="" x={800} y={500} />
        </div>
        <span className={classes.cityImageOwner}>
          <a rel="noopener noreferrer" target="_blank" href={`${city.image.imageOwner?.url ?? undefined}`}>
            {city.image.imageOwner?.title?.trim() ? `© Photo ${city.image.imageOwner?.title}` : null}
          </a>
        </span>
      </div>
      <div className={`${classes.cityText} col col12 col6-m p0 mb0`}>
        <>
          <h2 className={classes.cityTextHeader}>{`${city.country.name} / ${city.name}`} </h2>
          <div className={classes.cityTextContent}>
            <ul>
              {/* {city.tastes?.map((taste) => {
                return (
                  <li key={`${taste.image}${Math.random()}`}>
                    <TasteCard
                      taste={taste}
                      pois={pois}
                      poiCardClicked={poiCardClicked}
                      loading={currentTaste?.tasteId === taste.id && currentTaste.loading}
                      showPois={currentTaste?.tasteId === taste.id}
                      tasteClicked={tasteClicked}
                      disabled={currentTaste?.tasteId !== taste.id && currentTaste?.loading}
                    />
                  </li>
                );
              })} */}
            </ul>
          </div>
        </>
      </div>
    </div>
  );
};
export default CityInfo;
