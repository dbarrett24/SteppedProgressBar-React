import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { ProgressBar, Step } from 'react-step-progress-bar';
import InlineSVG from '../SVG';
import { progressBarConfig } from './config/progressBarConfig';

const ProgressBarWrapper = styled.div`
  margin: 0 1.35rem 3.5rem;
  @media (max-width: 747px) {
    margin-bottom: 0;
  }
`;
const StepText = styled.div`
  position: absolute;
  top: 90%;
  left: ${({ align }) => {
    let position = '50%';
    if (align === 'left') position = '0';
    if (align === 'right') position = 'auto';
    return position;
  }};
  right: ${({ align }) => {
    let position = 'auto';
    if (align === 'right') position = '0';
    return position;
  }};
  transform: ${({ align }) => (align === 'center' ? 'translateX(-50%)' : 'translateX(0)')};
  text-align: center;
  max-width: 150px;
  color: #000;
  font-family: 'NunitoSans Regular';
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 2rem;
  white-space: nowrap;
  @media (max-width: 747px) {
    display: none;
  }
`;
const StepContainer = styled.div`
  position: relative;
  svg {
    margin-top: 2px;
  }
`;

function progressSteps({ descriptionEntries, totalPercentage, deniedStatus }) {
  const steps = descriptionEntries.map((descriptionEntry, index, array) => {
    let step = progressBarConfig.stepTypes.middleStep;
    if (index === 0) step = progressBarConfig.stepTypes.firstStep;
    else if (index === array.length - 1) step = progressBarConfig.stepTypes.finalStep;
    return {
      ...descriptionEntry,
      ...step
    };
  });
  return steps.map(({ align, component, description, path, text, type, viewBox, width }, index) => {
    const key = `${type}_${index}`;
    const svgAttr = {
      fillColor: progressBarConfig.stepColor.unfulfilled,
      path,
      viewBox,
      width,
      transition: null,
      innerSVG: null
    };

    const applySVGStyles = (stepProps) => {
      svgAttr.transition = progressBarConfig.transitionStyles[stepProps.transitionState];

      // Conditions for SVG Bubble Rounding
      const isMiddleStep = stepProps.index !== 0;
      const isLastCompletedStep = parseInt(totalPercentage, 10) === Math.ceil(stepProps.position);
      svgAttr.path = path;
      svgAttr.viewBox = viewBox;
      svgAttr.width = width;

      if (stepProps.accomplished) {
        svgAttr.fillColor = '#637D9E';

        if (isMiddleStep && isLastCompletedStep) {
          svgAttr.fillColor = '#0F8BE1';
          svgAttr.path = progressBarConfig.stepTypes.finalStep.path;
          svgAttr.viewBox = progressBarConfig.stepTypes.finalStep.viewBox;
          svgAttr.width = steps[steps.length - 1].width; // apply finalStepSVGWidth
          svgAttr.innerSVG = progressBarConfig.stepTypes.lastFulfilledStep.innerSVG;
          if (deniedStatus) {
            svgAttr.fillColor = '#BA5A56';
          }
        }
      } else {
        svgAttr.fillColor = progressBarConfig.stepColor.unfulfilled;
      }
      return (
        <StepContainer>
          <InlineSVG
            d={svgAttr.path}
            style={svgAttr.transition}
            width={svgAttr.width}
            viewBox={svgAttr.viewBox}
            fill={svgAttr.fillColor}
            innerSVG={svgAttr.innerSVG}
          />
          <StepText align={align}>
            {text && <div>{text}</div>}
            {description && <div>{description}</div>}
            {component}
          </StepText>
        </StepContainer>
      );
    };
    return <Step key={key}>{applySVGStyles}</Step>;
  });
}
const SteppedProgressBar = ({ percent, deniedStatus, descriptionEntries }) => {
  return (
    <ProgressBar
      percent={percent}
      height={5}
      unfilledBackground="#CDD8E2"
      filledBackground={`linear-gradient(90deg, ${progressBarConfig.stepColor.fulfilled} 50.16%, ${
        deniedStatus ? progressBarConfig.stepColor.denied : progressBarConfig.stepColor.approved
      } 98.88%)`}
    >
      {progressSteps({
        descriptionEntries,
        totalPercentage: percent,
        deniedStatus
      })}
    </ProgressBar>
  );
};

const SteppedProgressBarWrapper = ({ deniedStatus = false, descriptionEntries }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (descriptionEntries.length > 1) {
      const totalStepsToCalc = descriptionEntries.length - 1;
      let stepCount = 0;
      for (let i = 1; i < descriptionEntries.length; i += 1) {
        const entry = descriptionEntries[i];
        if (!entry.complete) break;
        stepCount += 1;
      }
      setPercentage(Math.ceil((stepCount / totalStepsToCalc) * 100));
    }
  }, [descriptionEntries]);

  return (
    <>
      {/* <Flex column> */}
        <ProgressBarWrapper>
          <SteppedProgressBar
            percent={percentage}
            deniedStatus={deniedStatus}
            descriptionEntries={descriptionEntries}
          />
        </ProgressBarWrapper>
      {/* </Flex> */}
    </>
  );
};
export default SteppedProgressBarWrapper;
