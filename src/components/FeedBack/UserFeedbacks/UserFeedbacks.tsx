import Model from '@tripian/model';
import React from 'react';
import { Avatar } from '../../base/Svg/Icons';
import classes from './UserFeedbacks.scss';

interface IUserFeedbacks {
  userFeedbacks?: Model.UserFeedback[];
  t: (value: Model.TranslationKey) => string;
}

const UserFeedbacks: React.FC<IUserFeedbacks> = ({ userFeedbacks, t }) => {
  return (
    <>
      {userFeedbacks?.map((userFeedback, i) => (
        <div key={`${userFeedback.created_at} - ${i}`} className={classes.userFeedbackGeneral}>
          <div className={classes.userFeedbackTypeWrapper}>
            <div className={classes.userFeedbackType}>{userFeedback.subject_title}</div>
          </div>
          <div className={classes.userFeedbackDescWrapper}>
            <div className={classes.userFeedbackIcon}>
              <Avatar size="1rem" />
            </div>
            <div className={classes.userFeedbackDesc}>
              {userFeedback.desc}
              <div className={classes.userFeedbackDate}>
                {t('user.myFeedback.feedbackSentOn')} {userFeedback.created_at.split('T')[0]}
              </div>
            </div>
          </div>

          {userFeedback.replies.length > 0 ? (
            <div className={classes.userFeedbackReplyGeneral}>
              <div className={classes.userFeedbackReplyIconBg}>
                <div className={classes.userFeedbackReplyIcon} />
              </div>
              <div className={classes.userFeedbackReply}>
                {userFeedback.replies[0].reply}
                <div className={classes.userFeedbackReplyDate}>
                  {t('user.myFeedback.replySentOn')} {userFeedback.replies[0].created_at.split(' ')[0]}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default UserFeedbacks;
