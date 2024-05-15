/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useMemo, useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import moment from 'moment';
import classes from './FormTemplateTripNext.scss';
import Button from '../../base/Button/Button';
import StepComponent from './StepComponent/StepComponent';
import StepDestination from './StepDestination/StepDestination';
import StepTravelerInfo from './StepTravelerInfo/StepTravelerInfo';
import ArrowRight from '../../base/Svg/Icons/ArrowRight';

/**
 * Destinations
 * Stay & Shares
 * Picked Informations
 * Personalize tour trip
 */
interface IFormTemplateTripNext {
  tripProfile: Model.TripProfile;
  tripQuestions: Array<Model.Question>;
  cities: Array<Model.City>;
  isTripEdit?: boolean;
  callbackTripProfile: (tripProfile: Model.TripProfile) => void;
  userCompanionQuestions: Array<Model.Question>;
  userCompanions?: Array<Model.Companion>;
  companionLoadingList: Array<number>;
  callbackUserCompanionAdd: (userCompoanion: Model.Companion) => void;
  showTripModeQuestion?: boolean;

  stepHeaders: { stepId: number; header: string }[];
  destinationTips: { iconUrl: string; title: string; description: string }[];
  travelerInfoTips: { iconUrl: string; title: string; description: string }[];
  questionDefaultTip: { iconUrl: string; title: string; description: string };

  onSubmitText: string;
  onSubmit: () => void;
  onCancel: () => void;
  t: (value: Model.TranslationKey) => string;
}

const FormTemplateTripNext: React.FC<IFormTemplateTripNext> = ({
  tripProfile,
  tripQuestions,
  cities,
  isTripEdit = false,
  callbackTripProfile,
  userCompanionQuestions,
  userCompanions,
  companionLoadingList,
  callbackUserCompanionAdd,
  showTripModeQuestion = false,
  stepHeaders,
  destinationTips,
  questionDefaultTip,
  travelerInfoTips,
  onSubmitText,
  onSubmit,
  onCancel,
  t,
}) => {
  const [stepId, setStepId] = useState<number>(-1);
  const [bound, setBound] = useState<google.maps.LatLngBounds | undefined>();

  // const tripModeQuestion = tripQuestions.find((question) => question.id === 19);
  const filteredQuestions = useMemo(() => (showTripModeQuestion ? tripQuestions : tripQuestions.filter((x) => x.id !== 19)), [tripQuestions, showTripModeQuestion]);
  const stepQuestions = useMemo(() => filteredQuestions.filter((x) => x.stepId === stepId).sort((a, b) => a.order - b.order), [filteredQuestions, stepId]);

  const stepHeader = useMemo(() => stepHeaders.find((x) => x.stepId === stepId) ?? stepHeaders[0], [stepHeaders, stepId]);
  const isNextButtonDisabledStep1 = useMemo(() => !tripProfile.cityId || moment(tripProfile.arrivalDatetime).utcOffset(0) < moment().utcOffset(0), [tripProfile.arrivalDatetime, tripProfile.cityId]);
  const isNextButtonDisabledStep2 = useMemo(() => !tripProfile.accommodation || !tripProfile.accommodation?.coordinate?.lng || !tripProfile.accommodation?.coordinate?.lat, [tripProfile.accommodation]);

  moment.locale(window.twindow.langCode);

  const callbackTripAnswers = useCallback(
    (answers: Array<number>) => {
      const newTripProfile = { ...tripProfile };
      newTripProfile.answers = answers;
      callbackTripProfile(newTripProfile);
    },
    [callbackTripProfile, tripProfile],
  );

  const setBoundMemo = useCallback((newBound?: google.maps.LatLngBounds | undefined) => setBound(newBound), []);

  let stepClass;
  switch (stepId) {
    case -1:
      stepClass = classes.firstStep;
      break;
    case 0:
      stepClass = classes.secondStep;
      break;
    case 1:
      stepClass = classes.thirdStep;
      break;
    case 2:
      stepClass = classes.fourthStep;
      break;
    default:
      stepClass = classes.firstStep;
      break;
  }

  const destinations: { destinationId: number; destinationName: string; parentName: string }[] = useMemo(() => {
    return cities.map((city) => {
      const destination = {
        destinationId: city.id,
        destinationName: city.name,
        parentName: city.parentLocations.length === 0 ? city.country.name : `${city.parentLocations.map((parent) => parent.name).join(', ')}, ${city.country.name}`,
      };

      return destination;
    });
  }, [cities]);

  return (
    <>
      {/* Steps */}
      <div className={classes.stepsContainer}>
        <ul role="tablist" className={[classes.steps, stepClass].join(' ')}>
          {stepHeaders.map((stepH) => {
            return (
              <li role="tab" key={stepH.stepId} className={`${stepH.stepId === stepId ? classes.selectedStep : ''}`}>
                <div className={classes.stepHeader}>{stepH.header}</div>
                {stepH.stepId < 2 && <ArrowRight className={classes.stepArrowRight} />}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={`container pt5 ${classes.stepDestination}`}>
        {/* Page 1 */}
        {stepId === -1 && cities.length > 0 && <StepDestination tripProfile={tripProfile} destinations={destinations} setTripProfile={callbackTripProfile} isTripEdit={isTripEdit} destinationTips={destinationTips} t={t} />}

        {/* Page 2 */}
        {stepId === 0 && (
          <StepTravelerInfo
            tripProfile={tripProfile}
            cities={cities}
            bound={bound}
            setBound={setBoundMemo}
            setTripProfile={callbackTripProfile}
            callbackUserCompanionAdd={callbackUserCompanionAdd}
            companionLoadingList={companionLoadingList}
            userCompanionQuestions={userCompanionQuestions}
            userCompanions={userCompanions}
            travelerInfoTips={travelerInfoTips}
            t={t}
          />
        )}

        {/* Page 3 - 4 */}
        {stepId > 0 && <StepComponent defaultTip={questionDefaultTip} header={stepHeader.header} stepQuestions={stepQuestions} stepId={stepId} tripProfile={tripProfile} callbackTripAnswers={callbackTripAnswers} t={t} />}
        <div className={`row ${classes.formTempButtons}`}>
          <div className="col col12 col8-m mb0">
            <div className="row center m0">
              <div className="col col6 p0">
                {stepId === -1 ? (
                  <Button
                    text={t('trips.createNewTrip.form.cancel')}
                    color="primary"
                    onClick={() => {
                      onCancel();
                    }}
                  />
                ) : (
                  <Button
                    text={t('trips.createNewTrip.form.previous')}
                    color="primary"
                    onClick={() => {
                      setStepId((prevStepId) => prevStepId - 1);
                    }}
                  />
                )}
              </div>
              <div className="col col6 p0">
                {stepId === -1 ? (
                  <Button
                    text={t('trips.createNewTrip.form.continue')}
                    color="primary"
                    // color={isNextButtonDisabled ? 'disabled' : 'primary'}
                    disabled={isNextButtonDisabledStep1}
                    onClick={() => {
                      setStepId((prevStepId) => prevStepId + 1);
                    }}
                  />
                ) : stepId === 0 ? (
                  <Button
                    text={t('trips.createNewTrip.form.continue')}
                    color="primary"
                    // color={isNextButtonDisabled ? 'disabled' : 'primary'}
                    disabled={isNextButtonDisabledStep2}
                    onClick={() => {
                      setStepId((prevStepId) => prevStepId + 1);
                    }}
                  />
                ) : stepId === 2 ? (
                  <Button
                    text={onSubmitText}
                    color="primary"
                    // color={isNextButtonDisabled ? 'disabled' : 'primary'}
                    disabled={isNextButtonDisabledStep1 || isNextButtonDisabledStep2}
                    onClick={() => {
                      onSubmit();
                    }}
                  />
                ) : (
                  <Button
                    text={t('trips.createNewTrip.form.continue')}
                    color="primary"
                    // color={isNextButtonDisabled ? 'disabled' : 'primary'}
                    disabled={isNextButtonDisabledStep1 || isNextButtonDisabledStep2}
                    onClick={() => {
                      setStepId((prevStepId) => prevStepId + 1);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormTemplateTripNext;
