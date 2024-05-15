// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import labelCss from './Label.scss';

interface ILabel {
  text: string;
  children: React.ReactNode;
}
const Label: React.FC<ILabel> = ({ text, children }) => (
  <span className={labelCss.txt}>
    {text} Tripian Label Test
    <span>{children}</span>
  </span>
);

export default Label;
