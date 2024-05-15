/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Popover, ArrowContainer, PopoverPosition } from 'react-tiny-popover';
import classes from './CustomPopover.scss';

interface ICustomPopover {
  show: boolean;
  style?: Partial<CSSStyleDeclaration>;
  className?: string;
  // backdropClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  backdropClick?: (e: MouseEvent) => void;
  content: JSX.Element;
  positions?: PopoverPosition | PopoverPosition[];
  children: JSX.Element;
}

export type Ref = HTMLButtonElement;

const CustomPopover = React.forwardRef<Ref, ICustomPopover>(({ show, backdropClick = () => {}, style = {}, className = '', content, positions = ['top', 'bottom', 'right', 'left'], children }, ref) => (
  <Popover
    ref={ref}
    containerStyle={{ ...style }}
    containerClassName={`${classes.popover} ${className}`}
    isOpen={show}
    positions={positions}
    align="center"
    padding={5}
    clickOutsideCapture
    onClickOutside={backdropClick}
    content={({ position, childRect, popoverRect }) => (
      <ArrowContainer position={position} childRect={childRect} popoverRect={popoverRect} arrowColor="#fff" arrowSize={5}>
        {content}
      </ArrowContainer>
    )}
  >
    {children}
  </Popover>
));

export default CustomPopover;
