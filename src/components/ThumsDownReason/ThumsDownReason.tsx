/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import Model from '@tripian/model';
import RadioButton from '../base/RadioButtonGroup/RadioButton/RadioButton';
import classes from './ThumsDownReason.scss';

interface IThumsDownReason {
  undo: () => void;
  comment: (commentText: Model.REACTION_COMMENT) => void;
}

const ThumsDownReason: React.FC<IThumsDownReason> = ({ undo, comment }) => {
  const [options, setOptions] = useState<Array<{ text: Model.REACTION_COMMENT; checked: boolean }>>([]);
  const [showThankYouMessage, setShowThankYouMessage] = useState<boolean>(false);

  useEffect(() => {
    setOptions([
      { text: Model.REACTION_COMMENT.I_HAVE_BEEN_THERE_BEFORE, checked: false },
      { text: Model.REACTION_COMMENT.I_DONT_LIKE_THIS_PLACE, checked: false },
    ]);
  }, []);

  return (
    <div className={classes.card}>
      {showThankYouMessage ? (
        <div className={classes.thanksMessage}>Thank you for feedback</div>
      ) : (
        <>
          <span>Place removed</span>
          <div
            className={classes.undo}
            onKeyPress={() => {}}
            role="button"
            tabIndex={0}
            onClick={() => {
              undo();
            }}
          >
            undo
          </div>
          <div className={classes.tellUsWhy}>tell us why</div>
          <div className={classes.checkbox}>
            {options.map((option, index) => (
              <RadioButton
                style={{ display: 'flex', margin: '0' }}
                key={option.text}
                text={option.text}
                checked={option.checked}
                onChange={() => {
                  setShowThankYouMessage(true);
                  const newOptions = [...options];
                  if (index === 0) {
                    newOptions[0].checked = true;
                    newOptions[1].checked = false;
                    comment(newOptions[0].text);
                  } else {
                    newOptions[1].checked = true;
                    newOptions[0].checked = false;
                    comment(newOptions[1].text);
                  }
                  setOptions(newOptions);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThumsDownReason;
