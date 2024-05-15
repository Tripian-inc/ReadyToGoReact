import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model, { helper } from '@tripian/model';
import NumberCounter from '../../../base/NumberCounterNew/NumberCounter';
import GPlacesAutocomplete2 from '../../../GoogleMaps/GPlacesAutocomplete2/GPlacesAutocomplete2';
import UserCompanionSelection from '../../../UserCompanionSelection/UserCompanionSelection';
// import Header from '../../../base/Header/Header';
import InfoBox from '../../../base/InfoBox/InfoBox';
import classes from './StepTravelerInfo.scss';
import Required from '../../../base/Required/Required';

export interface StepTravelerInfoProps {
  tripProfile: Model.TripProfile;
  setTripProfile: (tripProfile: Model.TripProfile) => void;
  bound: google.maps.LatLngBounds | undefined;
  setBound: (newBound?: google.maps.LatLngBounds) => void;
  cities: Array<Model.City>;
  userCompanionQuestions: Array<Model.Question>;
  userCompanions?: Array<Model.Companion>;
  companionLoadingList: Array<number>;
  callbackUserCompanionAdd: (userCompoanion: Model.Companion) => void;
  travelerInfoTips: { iconUrl: string; title: string; description: string }[];
  t: (value: Model.TranslationKey) => string;
}

const StepTravelerInfo: React.FC<StepTravelerInfoProps> = ({ tripProfile, setTripProfile, bound, cities, setBound, userCompanionQuestions, userCompanions, companionLoadingList, callbackUserCompanionAdd, travelerInfoTips, t }) => {
  const [tip, setTip] = useState<{ iconUrl: string; title: string; description: string }>(travelerInfoTips[0]);

  useEffect(() => {
    const currentCity = cities.find((city) => city.id === tripProfile.cityId);
    if (currentCity) {
      const getTopParentCity = (c: Model.City): Model.City => {
        const parentCity = cities.find((city) => city.id === c.parentLocationId);
        if (parentCity === undefined) return c;
        return getTopParentCity(parentCity);
      };

      const topParentCity = getTopParentCity(currentCity);
      const { boundary } = topParentCity;

      const newBoundary = new google.maps.LatLngBounds(new google.maps.LatLng(boundary[0], boundary[2]), new google.maps.LatLng(boundary[1], boundary[3]));
      setBound(newBoundary);
    }
  }, [cities, setBound, tripProfile.cityId]);

  const callbackAdultsNumber = (num: number) => {
    const newTripProfile = { ...tripProfile };
    newTripProfile.numberOfAdults = num;
    setTripProfile(newTripProfile);
  };

  const callbackChildrenNumber = (num: number) => {
    const newTripProfile = { ...tripProfile };
    newTripProfile.numberOfChildren = num;
    setTripProfile(newTripProfile);
  };

  const callbackGPlacesAutocomplete = (googlePlace: google.maps.places.PlaceResult) => {
    const newTripProfile = helper.deepCopy(tripProfile);
    if (googlePlace.name === '') {
      newTripProfile.accommodation = undefined;
    } else {
      newTripProfile.accommodation = { name: googlePlace.name ?? null, provider: 'Google', imageUrl: '', refID: googlePlace.place_id ?? null, address: '', coordinate: { lat: 0, lng: 0 } };

      if (googlePlace.formatted_address) {
        newTripProfile.accommodation.address = googlePlace.formatted_address;
      }

      if (googlePlace.geometry) newTripProfile.accommodation.coordinate = { lat: googlePlace.geometry.location?.lat() || 1, lng: googlePlace.geometry.location?.lng() || 1 };
    }

    setTripProfile(newTripProfile);
  };

  const userCompanionSelectionCallBack = (companionId: number, isDeleteAction?: boolean) => {
    const newTripProfile = helper.deepCopy(tripProfile);
    if (isDeleteAction) {
      newTripProfile.companionIds.splice(newTripProfile.companionIds.indexOf(companionId), 1);
    } else {
      newTripProfile.companionIds.push(companionId);
    }

    setTripProfile(newTripProfile);
  };
  return (
    <div>
      {/* <div className="row row py10 px5 mb0">
        <div className="col col12 px0">
          <Header text="Stay & Share" />
        </div>
      </div> */}
      <div className={`row ${classes.stepStayAndShares}`}>
        <div className={`col col12 col8-m ${classes.stepSandSLeft}`}>
          <div className="col col12 mb0">
            <h4 className="mb4">{t('trips.createNewTrip.form.travelerInfo.title')}</h4>
            <div className="row m0">
              <div className="col col12 col5-m px0">
                <NumberCounter
                  header={t('trips.createNewTrip.form.travelerInfo.adults')}
                  defaultValue={tripProfile.numberOfAdults || 1}
                  minValue={1}
                  maxValue={20}
                  onChange={callbackAdultsNumber}
                  onFocus={() => setTip(travelerInfoTips[1])}
                  onBlur={() => setTip(travelerInfoTips[0])}
                />
              </div>
              <div className="col col12 col2-m px0 hide-s" />
              <div className="col col12 col5-m px0">
                <NumberCounter
                  header={t('trips.createNewTrip.form.travelerInfo.children')}
                  defaultValue={tripProfile.numberOfChildren || 0}
                  minValue={0}
                  maxValue={20}
                  onChange={callbackChildrenNumber}
                  onFocus={() => setTip(travelerInfoTips[2])}
                  onBlur={() => setTip(travelerInfoTips[0])}
                />
              </div>
            </div>
          </div>

          <div className="col col12">
            <div className={`col col12 px0 mb0 ${classes.content}`}>
              <h4 className="my4">{t('trips.createNewTrip.form.travelerInfo.accommodation.label')}</h4>
              {!tripProfile.accommodation ? <Required customClassName="mb0" /> : null}
            </div>
            <GPlacesAutocomplete2
              initialText={tripProfile.accommodation ? `${tripProfile.accommodation.name || ''} ${tripProfile.accommodation.address || ''}` : ''}
              onSelectedChanged={callbackGPlacesAutocomplete}
              boundry={bound}
              placeholder={t('trips.createNewTrip.form.travelerInfo.accommodation.placeholder')}
              onFocus={() => setTip(travelerInfoTips[3])}
              onBlur={() => setTip(travelerInfoTips[0])}
            />
          </div>

          <div className="col col12">
            <h4 className="mt8 mb4">{t('trips.createNewTrip.form.travelerInfo.companion.label')}</h4>
            <UserCompanionSelection
              selectedCompanionIds={tripProfile.companionIds}
              userCompanionQuestions={userCompanionQuestions}
              userCompanions={userCompanions}
              companionLoadingList={companionLoadingList}
              callbackUserCompanionAdd={callbackUserCompanionAdd}
              userCompanionSelectionCallBack={userCompanionSelectionCallBack}
              onFocus={() => setTip(travelerInfoTips[4])}
              onBlur={() => setTip(travelerInfoTips[0])}
              t={t}
            />
          </div>
        </div>
        <div className={`col col12 col4-m py5 hide-s ${classes.stepSandSRight}`}>
          <InfoBox title={tip.title} description={tip.description} iconUrl={tip.iconUrl} />
        </div>
      </div>
    </div>
  );
};

export default StepTravelerInfo;
