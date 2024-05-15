/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useState } from 'react';
import Model from '@tripian/model';
import { RSelectOption } from '../base/RSelect/RSelect';
import RSelectMulti from '../base/RSelectMulti/RSelectMulti';
import Button from '../base/Button/Button';
import UserCompanionFormTemplate from '../FormTemplate/FormTemplateCompanion/FormTemplateCompanion';
import AddIconButton from '../base/Button/Icons/Add';
import Modal from '../base/Modal/Modal';
import PreLoading from '../base/PreLoading/PreLoading';
import BUTTON_TYPES from '../base/Button/ButtonTypes';
import CloseIconButton2 from '../base/Button/Icons/CloseIconButton2/CloseIconButton2';
import classes from './UserCompanionSelection.scss';

const initialCompanionRequestState: Model.CompanionRequest = { age: 0, name: '', answers: [], title: 'Family member' };

interface IUserCompanionSelection {
  selectedCompanionIds: number[];
  userCompanionQuestions: Array<Model.Question>;
  userCompanions?: Array<Model.Companion>;
  companionLoadingList: Array<number>;
  callbackUserCompanionAdd: (userCompoanion: Model.Companion) => void;
  userCompanionSelectionCallBack: (selectedCompanionId: number, isDeleteAction?: boolean) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  t: (value: Model.TranslationKey) => string;
}

const UserCompanionSelection: React.FC<IUserCompanionSelection> = ({ selectedCompanionIds, userCompanionQuestions, userCompanions, companionLoadingList, callbackUserCompanionAdd, userCompanionSelectionCallBack, onFocus, onBlur, t }) => {
  const [showModal, setShowModal] = useState(false);
  const [userCompanionState, setUserCompanionState] = useState<Model.CompanionRequest>(initialCompanionRequestState);

  const callBackRSelect = (selectedOptions: RSelectOption[]) => {
    const allSelectedIds: number[] = selectedOptions.map((x) => +x.value);
    const newIds: number | undefined = allSelectedIds.find((x) => !selectedCompanionIds.includes(x));
    const deletedIds: number | undefined = selectedCompanionIds.find((x) => !allSelectedIds.includes(x));
    if (newIds) userCompanionSelectionCallBack(newIds);
    else if (deletedIds) userCompanionSelectionCallBack(deletedIds, true);
  };

  const isDoneButtonDisabled = !userCompanionState.name.trim() || !userCompanionState.age || userCompanionState.age === 0;

  const companionsOptions: RSelectOption[] = useMemo(
    () =>
      userCompanions
        ? userCompanions
            // .filter((x) => !selectedCompanionIds.includes(x.id))
            .map((userCompanion) => ({
              value: userCompanion.id.toString(),
              label: userCompanion.name,
            }))
        : [],
    [userCompanions],
  );

  // eslint-disable-next-line no-nested-ternary
  const selectedOptionValues: string[] = selectedCompanionIds.map((x) => x.toString());

  return (
    <>
      <Modal show={showModal || companionLoadingList.includes(0)} backdropClick={() => {}} className={classes.userCompModal}>
        {companionLoadingList.includes(0) ? (
          <div className={classes.modalLoading}>
            <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
          </div>
        ) : null}
        <div className="p5">
          <div className="row pl3">
            <div className="col col12">
              <CloseIconButton2
                fill="#000"
                rounded
                clicked={() => {
                  setShowModal(false);
                  setUserCompanionState(initialCompanionRequestState);
                }}
              />
            </div>
            <div className="col col12">
              <h4>{t('trips.createNewTrip.form.travelerInfo.companion.title')}</h4>
              <div>{t('trips.createNewTrip.form.travelerInfo.companion.description')}</div>
            </div>
          </div>

          <div className="p2">
            <UserCompanionFormTemplate
              userCompanion={userCompanionState as Model.Companion}
              questions={userCompanionQuestions}
              callbackFormTemplateCompanion={(userCompanion) => {
                setUserCompanionState(userCompanion);
              }}
              t={t}
            />
          </div>
          <div className="row center m0">
            <div>
              <Button
                text={t('trips.createNewTrip.form.travelerInfo.companion.submit')}
                color={isDoneButtonDisabled ? 'disabled' : 'primary'}
                onClick={() => {
                  callbackUserCompanionAdd(userCompanionState as Model.Companion);
                  setUserCompanionState(initialCompanionRequestState);
                  setShowModal(false);
                }}
                disabled={isDoneButtonDisabled}
              />
              {/* <Button
              text="CANCEL"
              color="primary"
              onClick={() => {
                setShowModal(false);
                setUserCompanionState(initialCompanionRequestState);
              }}
            /> */}
            </div>
          </div>
        </div>
      </Modal>
      <div
        className="row"
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          if (onBlur) onBlur();
        }}
      >
        <div className={classes.userCompLeft}>
          <RSelectMulti options={companionsOptions} selectedOptionValues={selectedOptionValues} onSelectedOptionChange={callBackRSelect} placeHolder={t('trips.createNewTrip.form.travelerInfo.companion.placeholder')} />
        </div>
        <div className={classes.userCompRight}>
          <AddIconButton className={classes.userCompanionAddButton} type={BUTTON_TYPES.OUTLINED} onClick={() => setShowModal(true)} />
        </div>
        {/* <div className="col col12">
          <ul className={classes.userCompanionContent}>
            {userCompanions
              ?.filter((item) => selectedCompanionIds?.includes(item.id))
              .map((companion) => (
                <li className={classes.userCompanionItem} key={companion.id}>
                  <div className={classes.companionList}>
                    <div>
                      <div className={classes.companionName}>
                        <span>{companion.name}</span>
                      </div>
                    </div>
                    <div>
                      <CloseIconButton2
                        fill="#000"
                        clicked={() => {
                          userCompanionSelectionCallBack(companion.id, true);
                        }}
                      />
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default UserCompanionSelection;
