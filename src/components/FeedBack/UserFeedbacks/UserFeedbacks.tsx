/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, import/no-extraneous-dependencies
import Model from '@tripian/model';
import React from 'react';
import { Avatar } from '../../base/Svg/Icons';
import classes from './UserFeedbacks.scss';

interface IUserFeedbacks {
  userFeedbacks?: Model.UserFeedback[];
}

const UserFeedbacks: React.FC<IUserFeedbacks> = ({ userFeedbacks }) => {
  const feedbackType = (id: number) => {
    if (id === 101) {
      return 'I want to report a problem';
    }
    if (id === 102) {
      // eslint-disable-next-line quotes
      return "It isn't easy to use";
    }
    if (id === 103) {
      return 'There is a bug';
    }
    if (id === 104) {
      return 'Payment Issues';
    }
    if (id === 201) {
      return 'Incorrect Address, website, and phone number, working hours';
    }
    if (id === 202) {
      return 'Permanently Closed';
    }
    if (id === 203) {
      return 'Incorrect description';
    }
    if (id === 204) {
      return 'Wrong POI type';
    }
    if (id === 205) {
      return 'Unrelated Tour & tickets';
    }
    if (id === 206) {
      return 'Unrelated photos';
    }
    return null;
  };

  return (
    <>
      {userFeedbacks?.map((userFeedback, i) => (
        <div key={`${userFeedback.created_at} - ${i}`} className={classes.userFeedbackGeneral}>
          <div className={classes.userFeedbackTypeWrapper}>
            <div className={classes.userFeedbackType}>{feedbackType(userFeedback.subject_id)}</div>
          </div>
          <div className={classes.userFeedbackDescWrapper}>
            <div className={classes.userFeedbackIcon}>
              <Avatar size="1rem" />
            </div>
            <div className={classes.userFeedbackDesc}>
              {userFeedback.desc}
              <div className={classes.userFeedbackDate}>Feedback sent on: {userFeedback.created_at.split('T')[0]}</div>
            </div>
          </div>

          {userFeedback.replies.length > 0 ? (
            <div className={classes.userFeedbackReplyGeneral}>
              <div className={classes.userFeedbackReplyIconBg}>
                <div className={classes.userFeedbackReplyIcon} />
              </div>
              <div className={classes.userFeedbackReply}>
                {userFeedback.replies[0].reply}
                <div className={classes.userFeedbackReplyDate}>Reply sent on: {userFeedback.replies[0].created_at.split(' ')[0]}</div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default UserFeedbacks;
