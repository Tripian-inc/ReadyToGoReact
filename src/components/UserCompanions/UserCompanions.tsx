/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, Fragment, useEffect } from 'react';
import Model, { helper } from '@tripian/model';
import DeleteIconButton from '../base/Button/Icons/Delete';
import EditIconButton from '../base/Button/Icons/Edit';
import CancelIconButton from '../base/Button/Icons/Cancel';
import CheckIconButton from '../base/Button/Icons/Check';
import classes from './UserCompanions.scss';
import TextField from '../base/TextField/TextField';
import NumberInput from '../base/NumberInput/NumberInput';
import Dropdown from '../base/Dropdown/Dropdown';
import PreLoading from '../base/PreLoading/PreLoading';
import QuestionTemplate from '../QuestionTemplate/QuestionTemplate';

interface IUserCompanions {
  companions: Model.Companion[];
  questions: Array<Model.Question>;
  companionLoadingList: Array<number>;
  deleteCompanion: (id: number) => void;
  editCompanion: (companion: Model.Companion) => void;
  showWarningMessage: (show: boolean) => void;
  t: (value: Model.TranslationKey) => string;
}

const UserCompanions: React.FC<IUserCompanions> = ({ companions, questions, companionLoadingList, deleteCompanion, editCompanion, showWarningMessage, t }) => {
  const [editableCompanion, setEditableCompanion] = useState<Model.Companion>();
  const [isCompanionChanged, setIsCompanionChanged] = useState<boolean>(false);
  const [initialCompanion, setInitialCompanion] = useState<Model.Companion>();

  const areDiffObject = (prevObject?: Model.Companion, currentObject?: Model.Companion) => {
    const prevObjectString = JSON.stringify(prevObject);
    const currentObjectString = JSON.stringify(currentObject);

    if (prevObjectString !== currentObjectString) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const areCompanionsDifferent = areDiffObject(initialCompanion, editableCompanion);
    setIsCompanionChanged(areCompanionsDifferent);
  }, [editableCompanion, initialCompanion]);

  return (
    <div className="col col12 p0">
      <h5 className="mb5 center">{t('user.travelCompanions.companionList')}</h5>
      <table className={classes.userCompanionTable}>
        <thead>
          <tr>
            <th>
              <h6>
                <b>{t('user.travelCompanions.companionTitle')}</b>
              </h6>
            </th>
            <th>
              <h6>
                <b>{t('user.travelCompanions.companionName')}</b>
              </h6>
            </th>
            <th>
              <h6>
                <b>{t('user.travelCompanions.companionAge')}</b>
              </h6>
            </th>
            <th className={classes.delete}>
              <h6>
                <b>{t('user.travelCompanions.editDelete')}</b>
              </h6>
            </th>
          </tr>
        </thead>

        <tbody>
          {companions.map((companion) => (
            <Fragment key={companion.id}>
              {companion.id === editableCompanion?.id ? (
                <>
                  <tr>
                    <td>
                      <Dropdown
                        options={helper.companionTitleOptions}
                        defaultValue={editableCompanion.title}
                        selectChange={(value) => {
                          const newEditableCompanion = { ...editableCompanion };
                          newEditableCompanion.title = value as string;
                          setEditableCompanion(newEditableCompanion);
                        }}
                      />
                    </td>
                    <td>
                      <TextField
                        name="companionName"
                        value={editableCompanion.name}
                        onChange={(event) => {
                          const newEditableCompanion = { ...editableCompanion };
                          newEditableCompanion.name = event.target.value;
                          setEditableCompanion(newEditableCompanion);
                        }}
                      />
                    </td>
                    <td>
                      <NumberInput
                        defaultValue={editableCompanion.age || 0}
                        minValue={1}
                        maxValue={100}
                        onchange={(value) => {
                          const newEditableCompanion = { ...editableCompanion };
                          newEditableCompanion.age = value ?? 0;
                          setEditableCompanion(newEditableCompanion);
                        }}
                      />
                    </td>
                    <td>
                      <div className={classes.userCompanionButtons}>
                        <CheckIconButton
                          color={!editableCompanion.name.trim() || !editableCompanion.age ? 'disabled' : 'primary'}
                          disabled={!editableCompanion.name.trim() || !editableCompanion.age || !isCompanionChanged}
                          onClick={() => {
                            editCompanion(editableCompanion);
                            setEditableCompanion(undefined);
                            setInitialCompanion(undefined);
                          }}
                        />
                        <CancelIconButton
                          color="primary"
                          onClick={() => {
                            setEditableCompanion(undefined);
                            setIsCompanionChanged(false);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ padding: '0' }}>
                      <div className="row mb5">
                        {/* TODO form template companion neden kullanmıyoruz ? */}
                        {questions.map((question) => (
                          <div key={question.id} className="col col12">
                            <QuestionTemplate
                              question={question}
                              answers={editableCompanion.answers}
                              callbackAnswers={(selectedAnswers) => {
                                const newEditableCompanion = { ...editableCompanion };
                                newEditableCompanion.answers = selectedAnswers.sort((a, b) => a - b);
                                setEditableCompanion(newEditableCompanion);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  {companionLoadingList.includes(companion.id) ? (
                    <td colSpan={4}>
                      <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
                    </td>
                  ) : (
                    <>
                      <td>{companion.title}</td>
                      <td>{companion.name}</td>
                      <td>{companion.age}</td>
                      <td>
                        <div className={classes.userCompanionButtons}>
                          <div>
                            <EditIconButton
                              color="primary"
                              onClick={() => {
                                if (companion.memberOfTrip) {
                                  showWarningMessage(true);
                                } else {
                                  showWarningMessage(false);
                                  setEditableCompanion({ ...companion, answers: companion.answers.sort((a, b) => a - b) });
                                  setInitialCompanion({ ...companion, answers: companion.answers.sort((a, b) => a - b) });
                                }
                              }}
                            />
                          </div>
                          <div>
                            <DeleteIconButton
                              color="primary"
                              onClick={() => {
                                if (companion.memberOfTrip) {
                                  showWarningMessage(true);
                                } else {
                                  showWarningMessage(false);
                                  deleteCompanion(companion.id);
                                  setIsCompanionChanged(false);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              )}
            </Fragment>
          ))}

          {companions.length === 0 ? (
            <tr>
              <td className={classes.emptyMessage} colSpan={4}>
                {t('user.travelCompanions.emptyMessage')}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default UserCompanions;
