import parse from 'html-react-parser';
import { progressbar } from './svgs';

export const progressBarConfig = {
  transitionStyles: {
    entering: { transform: 'scale(1.5)', transition: 'transform 1s' },
    entered: { transform: 'scale(1)', transition: 'transform 1s' },
    exiting: { transform: 'scale(1.5)', transition: 'transform 1s' },
    exited: { transform: 'scale(1)', transition: 'transform 1s' }
  },
  stepColor: {
    unfulfilled: '#CDD8E2',
    fulfilled: '#637D9E',
    denied: '#BA5A56',
    approved: '#0F8BE1'
  },
  stepTypes: {
    firstStep: {
      type: 'firstStep',
      path: progressbar.firstStep.d,
      width: '2.7rem',
      viewBox: '0 0 105 90',
      align: 'left'
    },
    middleStep: {
      type: 'middleStep',
      path: progressbar.middleStep.d,
      width: '2.7rem',
      viewBox: '0 0 105 90',
      align: 'center'
    },
    finalStep: {
      type: 'finalStep',
      path: progressbar.finalStep.d,
      width: '2.7rem',
      viewBox: '0 0 105 90',
      align: 'right'
    },
    lastFulfilledStep: {
      type: 'lastFulfilledStep',
      innerSVG: parse(progressbar.lastFulfilledStep.innerSVG),
      width: '2.7rem',
      viewBox: '0 0 105 90'
    }
  }
};
