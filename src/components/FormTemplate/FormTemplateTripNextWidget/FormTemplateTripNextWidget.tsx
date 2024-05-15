import React, { useCallback, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import moment from 'moment';
import Button from '../../base/Button/Button';
import StepDestinationWidget from './StepDestinationWidget/StepDestinationWidget';
import classes from './FormTemplateTripNextWidget.scss';

/**
 * Destinations
 * Stay & Shares
 * Picked Informations
 * Personalize tour trip
 */
interface IFormTemplateTripNextWidget {
  tripProfile: Model.TripProfile;
  cities: Array<Model.City>;
  uniqueUserId: string;

  callbackTripProfile: (tripProfile: Model.TripProfile) => void;
  onSubmitText: string;
  onSubmit: () => void;

  stepHeader: { stepId: number; header: string };
  t: (value: Model.TranslationKey) => string;
  /* destinationTips: { iconUrl: string; title: string; description: string }[]; */
}

const FormTemplateTripNextWidget: React.FC<IFormTemplateTripNextWidget> = ({
  tripProfile,
  cities,
  uniqueUserId,

  callbackTripProfile,
  onSubmitText,
  onSubmit,
  t,

  /* destinationTips, */
}) => {
  moment.locale(window.twindow.langCode);

  const [bound, setBound] = useState<google.maps.LatLngBounds | undefined>();

  const setBoundMemo = useCallback((newBound?: google.maps.LatLngBounds | undefined) => setBound(newBound), []);

  const isNextButtonDisabledStep1 = useMemo(() => !tripProfile.cityId || moment(tripProfile.arrivalDatetime).utcOffset(0) < moment().utcOffset(0), [tripProfile.arrivalDatetime, tripProfile.cityId]);

  return (
    <>
      <div className={`pt5 ${classes.stepDestination}`}>
        {/* Page 1 */}
        <StepDestinationWidget
          uniqueUserId={uniqueUserId}
          tripProfile={tripProfile}
          cities={cities}
          setTripProfile={callbackTripProfile}
          isTripEdit={false}
          bound={bound}
          setBound={setBoundMemo}
          t={t}
          /* destinationTips={destinationTips} */
        />

        <div className={`row center ${classes.formTempButtons}`}>
          <div className="col col6 p0">
            <Button
              text={onSubmitText}
              color="primary"
              // color={isNextButtonDisabled ? 'disabled' : 'primary'}
              disabled={isNextButtonDisabledStep1}
              onClick={() => {
                onSubmit();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormTemplateTripNextWidget;
