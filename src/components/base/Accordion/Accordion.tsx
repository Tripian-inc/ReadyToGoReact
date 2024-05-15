/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import className from './Accordion.scss';

interface IAccordion {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultChecked?: boolean;
  // checked?: boolean;
  onClick?: (id: string) => void;
}

const Accordion: React.FC<IAccordion> = ({ id, title, content, defaultChecked, /* checked, */ onClick }) => (
  <div className={className.accordion}>
    <input className={className.accordionInput} onChange={() => {}} /* checked={checked} */ type="checkbox" name={id} id={id} defaultChecked={defaultChecked} onClick={() => onClick && onClick(id)} />
    <label className={className.accordionLabel} htmlFor={id}>
      {title}
    </label>
    <div className={className.accordionContent}>{content}</div>
  </div>
);

export default Accordion;
