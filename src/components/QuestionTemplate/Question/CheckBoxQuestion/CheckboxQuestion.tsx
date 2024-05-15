/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useContext } from 'react';

import Checkbox from '../../../base/Checkbox/Checkbox';
import CheckboxTree from '../../../base/CheckboxTree/CheckboxTree';
import QuestionContext from '../../Context/QuestionContext';
import classes from './CheckboxQuestion.scss';

interface ICheckboxQuestion {
  defaultAnswers: Array<number>;
  checkBoxChangeParent: (addedOptionId?: number, removedOptionId?: number) => void;
  checkBoxChangeChild: (addedOptionId?: number, removedOptionId?: number) => void;
  flexDirection: 'column' | 'row';
}

const CheckboxQuestion: React.FC<ICheckboxQuestion> = ({ defaultAnswers, checkBoxChangeParent, checkBoxChangeChild, flexDirection }) => {
  const { question } = useContext(QuestionContext);

  const handleChangeParent = (checked: boolean, domId: string) => {
    if (checked) {
      checkBoxChangeParent(+domId, undefined);
    } else {
      checkBoxChangeParent(undefined, +domId);
    }
  };

  const handleChangeChild = (checked: boolean, domId: string) => {
    if (checked) {
      checkBoxChangeChild(+domId, undefined);
    } else {
      checkBoxChangeChild(undefined, +domId);
    }
  };

  // const exploreQuestion = question.id === 6;

  return (
    <>
      <h4 className="my2">{question.name}</h4>
      <div className={flexDirection === 'column' ? `${classes.fcol}` : undefined}>
        {question.answers.map((option) => {
          const subOptions = option.subAnswers;
          if (subOptions)
            return (
              <CheckboxTree
                key={option.id}
                domId={option.id.toString()}
                text={option.name}
                subOptions={subOptions}
                // checkeds={defaultAnswers}
                checkeds={defaultAnswers.filter((answer) => answer === option.id || subOptions.findIndex((subOption) => subOption.id === answer) !== -1)}
                onChangeParent={handleChangeParent}
                onChangeChild={handleChangeChild}
                // style={exploreQuestion ? { fontWeight: 600 } : undefined}
              />
            );

          return (
            <Checkbox
              key={option.id}
              domId={option.id.toString()}
              text={option.name}
              checked={defaultAnswers.includes(option.id)}
              onChange={handleChangeChild}
              //  style={exploreQuestion ? { fontWeight: 600 } : undefined}
            />
          );
        })}
      </div>
    </>
  );
};
export default CheckboxQuestion;
