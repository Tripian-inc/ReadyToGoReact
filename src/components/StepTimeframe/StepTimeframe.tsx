/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { helper } from '@tripian/model';
import moment from 'moment';
import Dropdown from '../base/Dropdown/Dropdown';
import Button from '../base/Button/Button';
import classes from './StepTimeframe.scss';
import BUTTON_TYPES from '../base/Button/ButtonTypes';
import { Time } from '../base/Svg/Icons';

interface IStepTimeframe {
  defaultTimeframe: { startTime: string; endTime: string };
  callbackStepTimeframe: (timeFrame: { startTime: string; endTime: string }) => void;
}

const StepTimeframe: React.FC<IStepTimeframe> = ({ defaultTimeframe, callbackStepTimeframe }) => {
  const [timeframe, setTimeframe] = useState<{ startTime: string; endTime: string }>({ startTime: '', endTime: '' });
  const [timeFrameDivText, setTimeFrameDivText] = useState<string>('');
  const [showTimeframeSelections, setShowTimeframeSelections] = useState<boolean>();
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>();

  moment.locale(window.twindow.langCode);

  const timeOptions = helper.timeRange.map((time) => ({
    key: time,
    value: time,
  }));

  useEffect(() => {
    setTimeframe(defaultTimeframe);
    setTimeFrameDivText(`${defaultTimeframe.startTime}-${defaultTimeframe.endTime}`);
    setShowTimeframeSelections(false);
    setShowUpdateButton(false);
  }, [defaultTimeframe]);

  const changeTimeframe = (action: string, time: string | number) => {
    const newTimeframe = { ...timeframe };
    if (action === 'startTime') {
      newTimeframe.startTime = time.toString();
      setTimeframe(newTimeframe);
    } else {
      newTimeframe.endTime = time.toString();
      setTimeframe(newTimeframe);
    }

    if (newTimeframe.startTime === defaultTimeframe.startTime && newTimeframe.endTime === defaultTimeframe.endTime) {
      setShowUpdateButton(false);
    } else {
      setShowUpdateButton(true);
    }
  };

  const updateButtonDisabled = moment(timeframe.startTime, 'HH:mm') >= moment(timeframe.endTime, 'HH:mm');

  return (
    <>
      <div className="row mb0 pb0">
        {showTimeframeSelections ? (
          <>
            <div className="col col4 mb0 pb0">
              <Dropdown options={timeOptions} defaultValue={timeframe.startTime} selectChange={(start) => changeTimeframe('startTime', start)} />
            </div>
            <div className="col col4 mb0 pb0">
              <Dropdown options={timeOptions} defaultValue={timeframe.endTime} selectChange={(end) => changeTimeframe('endTime', end)} />
            </div>

            {showUpdateButton ? (
              <div className={`col col2 mb0 pb0 center ${classes.stepTimeFrameCenter}`}>
                <Button
                  className={classes.stepTimeFrameButton}
                  type={BUTTON_TYPES.OUTLINED}
                  color={updateButtonDisabled ? 'disabled' : 'primary'}
                  iconPath="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"
                  iconViewBox="0 -46 417.81333 417"
                  /* text="Update" */
                  disabled={updateButtonDisabled}
                  onClick={() => {
                    callbackStepTimeframe(timeframe);
                    setTimeFrameDivText(`${timeframe.startTime}-${timeframe.endTime}`);
                    setShowTimeframeSelections(false);
                  }}
                  size="small"
                />
              </div>
            ) : null}

            <div className={`${classes.stepTimeFrameCenter} ${showUpdateButton ? 'col col2 mb0 pb0 center' : 'col col4 mb0 pb0'}`}>
              <Button
                className={classes.stepTimeFrameButton}
                type={BUTTON_TYPES.OUTLINED}
                color="primary"
                iconPath="M64.1039 50.6494L97.7399 17.0039C98.6487 16.1262 99.3736 15.0762 99.8723 13.9153C100.371 12.7545 100.633 11.5059 100.644 10.2425C100.655 8.97905 100.415 7.72611 99.9362 6.55673C99.4578 5.38736 98.7513 4.32497 97.8579 3.43157C96.9645 2.53817 95.9021 1.83164 94.7327 1.35321C93.5633 0.874783 92.3104 0.634034 91.047 0.645013C89.7836 0.655991 88.535 0.918478 87.3741 1.41716C86.2132 1.91584 85.1633 2.64072 84.2855 3.54951L50.64 37.1855L17.004 3.54951C16.1263 2.64072 15.0763 1.91584 13.9155 1.41716C12.7546 0.918478 11.506 0.655991 10.2426 0.645013C8.97918 0.634034 7.72623 0.874783 6.55685 1.35321C5.38748 1.83164 4.32509 2.53817 3.43169 3.43157C2.53829 4.32497 1.83176 5.38736 1.35333 6.55673C0.874905 7.72611 0.634156 8.97905 0.645135 10.2425C0.656113 11.5059 0.918601 12.7545 1.41728 13.9153C1.91596 15.0762 2.64084 16.1262 3.54963 17.0039L37.1856 50.6399L3.54963 84.2854C2.64084 85.1632 1.91596 86.2131 1.41728 87.374C0.918601 88.5349 0.656113 89.7834 0.645135 91.0468C0.634156 92.3103 0.874905 93.5632 1.35333 94.7326C1.83176 95.902 2.53829 96.9643 3.43169 97.8577C4.32509 98.7511 5.38748 99.4577 6.55685 99.9361C7.72623 100.415 8.97918 100.655 10.2426 100.644C11.506 100.633 12.7546 100.371 13.9155 99.8722C15.0763 99.3735 16.1263 98.6486 17.004 97.7398L50.64 64.1038L84.2855 97.7398C85.1633 98.6486 86.2132 99.3735 87.3741 99.8722C88.535 100.371 89.7836 100.633 91.047 100.644C92.3104 100.655 93.5633 100.415 94.7327 99.9361C95.9021 99.4577 96.9645 98.7511 97.8579 97.8577C98.7513 96.9643 99.4578 95.902 99.9362 94.7326C100.415 93.5632 100.655 92.3103 100.644 91.0468C100.633 89.7834 100.371 88.5349 99.8723 87.374C99.3736 86.2131 98.6487 85.1632 97.7399 84.2854L64.1039 50.6399V50.6494Z"
                iconViewBox="0 0 101 101"
                /* text="Cancel" */
                onClick={() => {
                  setShowTimeframeSelections(false);
                  setShowUpdateButton(false);
                  setTimeframe(defaultTimeframe);
                  setTimeFrameDivText(`${defaultTimeframe.startTime}-${defaultTimeframe.endTime}`);
                }}
                size="small"
              />
            </div>
          </>
        ) : (
          <div className="col col12 mb0 pb0">
            {/* <div
              role="button"
              tabIndex={0}
              onKeyPress={() => {}}
              className={classes.timeframe}
              onClick={() => {
                setShowTimeframeSelections(true);
              }}
            >
              <span>{timeFrameDivText}</span>
            </div> */}
            <div className={classes.timeFrameSelections}>
              <Time fill="var(--text-primary-color)" />
              <div
                className={classes.hourText}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setShowTimeframeSelections(true);
                }}
              >
                {timeFrameDivText}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StepTimeframe;
