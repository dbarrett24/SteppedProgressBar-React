import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// for rendering inline svg <format></format>
const InlineSVG = ({ fill, width, className, style, viewBox, d, clicked, innerSVG }) => {
  return (
    <svg
      aria-hidden="true"
      width={width}
      height={width}
      viewBox={`${viewBox}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon ${className || ''}`}
      style={style}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={clicked}
    >
      <path fill={fill} d={d} />
      {innerSVG}
    </svg>
  );
};

InlineSVG.propTypes = {
  d: PropTypes.string.isRequired,
  fill: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  // style is useful for transitions | accepts an object of CSS style properties and their values
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  viewBox: PropTypes.string,
  clicked: PropTypes.func
};

InlineSVG.defaultProps = {
  fill: '#000',
  width: '100%',
  style: null,
  viewBox: '0 0 24 24',
  className: '',
  clicked: null
};

export default InlineSVG;

const Img = styled.img`
  ${(props) => {
    const { prioritize, size } = props;
    if (prioritize === 'width') {
      return `width: ${size}rem;`;
    }
    return `height: ${size}rem;`;
  }}
`;

// this icon is rendered by placing an svg img into img tag
export const Icon = ({ size, path, prioritize }) => (
  <Img src={path} size={size} prioritize={prioritize} />
);
