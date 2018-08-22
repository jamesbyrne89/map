import React from 'react';
import styled from 'styled-components';
import { styles } from '../constants';
import { calculateWalkTime, getSpaceType } from '../helpers';

const StyledResult = styled.article`
  border-top: 1px solid #efefef;
  padding: 0.675em;
  display: flex;
  cursor: pointer;
  &:hover,
  &:active {
    background: ${styles.jp_pale_blue};
  }
`;

export const StyledDetails = styled.div`
  padding: 0.675em 1em;
`;

export const StyledResultRow = styled.div`
  margin-top: 1rem;
  display: ${props => (props.display ? props.display : 'flex')};
  justify-content: ${props => props.spacing};
  border-top: ${props => (props.topBorder ? '1px solid #efefef' : 'none')};
`;

const StyledPrice = styled.div`
  color: #fff;
  background: ${styles.jp_navy};
  padding: 0.25em 0.5em;
  font-size: 0.875rem;
  span {
    line-height: 1;
  }
  span:first-child {
    font-weight: 400;
  }
  span:last-child {
    font-size: 0.75em;
  }
`;

const StyledStatus = styled.span`
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
  color: ${styles.jp_gold};
  font-size: 0.75rem;
  line-height: 1;
  img {
    height: 1.5em;
    margin-right: 0.5em;
    margin-bottom: -0.275em;
  }
`;

export const StyledWalkDistance = styled.span`
  img {
    margin-right: 0.5em;
    margin-bottom: -0.2em;
  }
`;

const StyledThumbnail = styled.img.attrs({
  src: props => (props.photo ? props.photo : 'images/placeholder_img.svg'),
  alt: props => props.title
})`
  max-width: 120px;
  height: auto;
  margin: 0 auto auto;
`;

const Result = props => {
  return (
    <StyledResult>
      <StyledThumbnail src={props.photo} title={props.title} />
      <StyledDetails>
        <StyledResultRow>
          <StyledType>{`${getSpaceType(props.title)}  `}</StyledType>
          {` ${props.title.slice(props.title.indexOf(' '))}`}
        </StyledResultRow>
        <StyledResultRow>
          <StyledStatus>
            <img alt="reservable" src="images/thunder.svg" />
            Reservable
          </StyledStatus>
        </StyledResultRow>
        <StyledResultRow display={'block'} spacing="space-between">
          <StyledWalkDistance>
            <img alt="walking distance" src="images/walking_icon.svg" />
            <span>{calculateWalkTime(props.distance)}</span>
          </StyledWalkDistance>
          <StyledPrice>
            <span>{props.price.slice(0, props.price.indexOf('.') + 1)}</span>
            <span>
              {props.price.slice(
                props.price.indexOf('.') + 1,
                props.price.length
              )}
            </span>
          </StyledPrice>
        </StyledResultRow>
      </StyledDetails>
    </StyledResult>
  );
};

export default Result;
