// eslint-disable-next-line import/no-extraneous-dependencies
import Model, { helper } from '@tripian/model';
import moment from 'moment';
import React, { useEffect, useMemo /* , useState */ } from 'react';
import Dropdown from '../../../base/Dropdown/Dropdown';
import Input from '../../../base/Input/Input';
// import Header from '../../../base/Header/Header';
/* import InfoBox from '../../../base/InfoBox/InfoBox'; */
import Required from '../../../base/Required/Required';
import RSelect, { RSelectOption } from '../../../base/RSelect/RSelect';
import DateRangePicker from '../../../DateRangePicker/DateRangePicker';
import GPlacesAutocomplete2 from '../../../GoogleMaps/GPlacesAutocomplete2/GPlacesAutocomplete2';
import classes from './StepDestinationWidget.scss';

export interface StepDestinationWidgetProps {
  uniqueUserId: string;
  tripProfile: Model.TripProfile;
  cities: Model.City[];
  setTripProfile: (tripProfile: Model.TripProfile) => void;
  bound: google.maps.LatLngBounds | undefined;
  setBound: (newBound?: google.maps.LatLngBounds) => void;
  isTripEdit: boolean;
  t: (value: Model.TranslationKey) => string;
  /* destinationTips: { iconUrl: string; title: string; description: string }[]; */
}

const StepDestinationWidget: React.FC<StepDestinationWidgetProps> = ({ uniqueUserId, tripProfile, cities, setTripProfile, bound, setBound, isTripEdit, t /* , destinationTips */ }) => {
  /* const [tip, setTip] = useState<{ iconUrl: string; title: string; description: string }>(destinationTips[0]); */

  moment.locale(window.twindow.langCode);

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

  const startTimeOptions = useMemo(() => {
    const sameDay: boolean = tripProfile.arrivalDatetime.split('T')[0] === tripProfile.departureDatetime.split('T')[0];

    const startTimes = helper.startTimeRange(!sameDay).map((time: string) => ({
      key: undefined,
      value: time,
    }));

    return startTimes;
  }, [tripProfile.arrivalDatetime, tripProfile.departureDatetime]);

  const endTimeOptions = useMemo(() => {
    const sameDay: boolean = tripProfile.arrivalDatetime.split('T')[0] === tripProfile.departureDatetime.split('T')[0];
    const startTime = sameDay ? tripProfile.arrivalDatetime.split('T')[1].substring(0, 5) : undefined;

    return helper.endTimeRange(startTime).map((time: string) => ({
      key: undefined,
      value: time,
    }));
  }, [tripProfile.arrivalDatetime, tripProfile.departureDatetime]);

  const callbackDateRangePicker = (startDate: moment.Moment, endDate: moment.Moment) => {
    const newTripProfile = { ...tripProfile };
    const notUtcStartDate = startDate.utcOffset(0);
    const notUtcEndDate = endDate.utcOffset(0);
    const newStartDate = { year: +notUtcStartDate.format('YYYY'), month: +notUtcStartDate.format('MM') - 1, day: +notUtcStartDate.format('DD') };
    const newEndDate = { year: +notUtcEndDate.format('YYYY'), month: +notUtcEndDate.format('MM') - 1, day: +notUtcEndDate.format('DD') };

    const startDateTime = moment(newTripProfile.arrivalDatetime)
      .set({
        year: newStartDate.year,
        month: newStartDate.month,
        date: newStartDate.day,
      })
      .utcOffset(0);
    // .format('YYYY-MM-DDTHH:mm:ss[Z]');

    newTripProfile.arrivalDatetime = `${startDateTime.format('YYYY')}-${startDateTime.format('MM')}-${startDateTime.format('DD')}T${newTripProfile.arrivalDatetime.split('T')[1]}`;

    const endDateTime = moment(newTripProfile.departureDatetime)
      .set({
        year: newEndDate.year,
        month: newEndDate.month,
        date: newEndDate.day,
      })
      .utcOffset(0);
    // .format('YYYY-MM-DDTHH:mm:ss[Z]');
    newTripProfile.departureDatetime = `${endDateTime.format('YYYY')}-${endDateTime.format('MM')}-${endDateTime.format('DD')}T${newTripProfile.departureDatetime.split('T')[1]}`;

    setTripProfile(newTripProfile);
  };

  const callbackArrivalDateTime = (arrivalTime: string | number) => {
    const newTripProfile = { ...tripProfile };
    newTripProfile.arrivalDatetime = moment(newTripProfile.arrivalDatetime)
      .set({ hour: +arrivalTime.toString().slice(0, 2), minute: +arrivalTime.toString().slice(3, 5) })
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
    setTripProfile(newTripProfile);
  };

  const callbackDepartureDateTime = (departureTime: string | number) => {
    const newTripProfile = { ...tripProfile };
    newTripProfile.departureDatetime = moment(newTripProfile.departureDatetime)
      .set({ hour: +departureTime.toString().slice(0, 2), minute: +departureTime.toString().slice(3, 5) })
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
    setTripProfile(newTripProfile);
  };

  const callbackCitySelect = (selectedOption: RSelectOption) => {
    const newTripProfile = helper.deepCopy(tripProfile);
    newTripProfile.cityId = +selectedOption.value;
    setTripProfile(newTripProfile);
  };

  const citiesOptions: RSelectOption[] = useMemo(
    () =>
      cities
        .sort((a, b) => helper.compareStringForSort(a.name, b.name))
        .map((city) => ({
          value: city.id.toString(),
          label: city.name,
        })),
    [cities],
  );

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

  // const selectedCity = useMemo(() => cities.find((city) => city.id === tripProfile.cityId), [cities, tripProfile.cityId]);

  return (
    <div>
      {/* <div className="row row py10 px5 mb0">
        <div className="col col12 px0">
          <Header text="Destinations" />
        </div>
      </div> */}
      <div className={`row ${classes.stepDestination}`}>
        <div className={`col col12 ${classes.stepDestLeft}`}>
          <div className="col col12">
            <div className="col col12 p0">
              <h4 className="mt8 mb4">{t('trips.agentCreateNewTrip.form.userId')}</h4>
            </div>
            <div className="col col12 p0">
              <Input name="uniqueUserId" value={uniqueUserId} disabled onChange={() => {}} size="default" />
            </div>
          </div>
          <div className="col col12">
            <div className={`col col12 px0 mb4 ${classes.content}`}>
              <h4 className="m0">{t('trips.createNewTrip.form.destination.city.label')}</h4>
              {!tripProfile.cityId ? <Required customClassName="mb0" /> : null}
            </div>
            <RSelect
              options={citiesOptions}
              disabled={isTripEdit}
              selectedOptionValue={tripProfile.cityId.toString()}
              onSelectedOptionChange={callbackCitySelect}
              placeHolder={t('trips.createNewTrip.form.destination.city.placeholder')}
              /* onFocus={() => setTip(destinationTips[1])}
              onBlur={() => setTip(destinationTips[0])} */
            />
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
              disabled={tripProfile.cityId === 0}
            />
          </div>

          <div className="col col12">
            <h4 className="mt8 mb4">
              {t('trips.createNewTrip.form.destination.dates')}
              {moment(tripProfile.arrivalDatetime).utcOffset(0) < moment().utcOffset(0) ? <span style={{ color: ' #ff0000' }}> *</span> : null}
            </h4>
            <DateRangePicker
              currentDateRange={
                moment(tripProfile.arrivalDatetime).utcOffset(0) < moment().utcOffset(0)
                  ? // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                    { startDate: null as any, endDate: null as any }
                  : {
                      startDate: moment(tripProfile.arrivalDatetime).utcOffset(0),
                      endDate: moment(tripProfile.departureDatetime).utcOffset(0),
                    }
              }
              onchanged={callbackDateRangePicker}
              /* onFocus={(start) => setTip(start ? destinationTips[2] : destinationTips[3])}
              onBlur={() => setTip(destinationTips[0])} */
            />
          </div>
          <div className="col col12">
            <h4 className="mt8 mb4">{t('trips.createNewTrip.form.destination.hours')}</h4>
            <div className="row m0">
              <div className="col col12 col5-m px0">
                <Dropdown
                  options={startTimeOptions}
                  defaultValue={`${moment(tripProfile.arrivalDatetime).utcOffset(0).format('HH')}:${moment(tripProfile.arrivalDatetime).utcOffset(0).format('mm')}`}
                  selectChange={callbackArrivalDateTime}
                  /* onFocus={() => setTip(destinationTips[4])}
                  onBlur={() => setTip(destinationTips[0])} */
                />
              </div>
              <div className="col col12 col2-m px0 hide-s" />
              <div className="col col12 col5-m px0">
                <Dropdown
                  options={endTimeOptions}
                  defaultValue={`${moment(tripProfile.departureDatetime).utcOffset(0).format('HH')}:${moment(tripProfile.departureDatetime).utcOffset(0).format('mm')}`}
                  selectChange={callbackDepartureDateTime}
                  /* onFocus={() => setTip(destinationTips[5])}
                  onBlur={() => setTip(destinationTips[0])} */
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className={`col col12 col4-m py5 hide-s ${classes.stepDestRight}`}>
          <InfoBox title={tip.title} description={tip.description} iconUrl={tip.iconUrl} />
        </div> */}
      </div>
    </div>
  );
};

export default StepDestinationWidget;
