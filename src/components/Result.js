import React from 'react';
import styled from 'styled-components';
import { styles } from '../constants';

const StyledResult = styled.article`
  border-top: 1px solid #efefef;
  padding: 0.675em;
  display: flex;
  &:hover,
  &:active {
    background: ${styles.jp_pale_blue};
  }
`;

const StyledType = styled.span`
  color: ${styles.jp_green};
  font-weight: 700;
`;

const StyledDetails = styled.div`
  padding: 0.675em;
`;

const StyledResultRow = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: ${props => props.spacing};
`;

const StyledPrice = styled.div`
  color: #fff;
  background: ${styles.jp_navy};
  padding: 0.25em 0.5em;
`;

function calculateWalkTime(distance) {
  // 3.1mph is average walking speed
  const milesPerMinute = 3.1 / 60;
  return parseInt(distance / milesPerMinute, 0);
}

const Result = props => {
  return (
    <StyledResult>
      <img
        src={props.photo ? props.photo : 'images/placeholder_img.svg'}
        alt={props.title}
      />
      <StyledDetails>
        <StyledResultRow>
          <StyledType>{`${props.title.split(' ')[0]} `}</StyledType>
          {props.title.substr(props.title.indexOf(' ') + 1)}
        </StyledResultRow>
        <StyledResultRow>RESERVABLE</StyledResultRow>
        <StyledResultRow spacing="space-between">
          {`${calculateWalkTime(props.distance)} ${
            calculateWalkTime(props.distance) > 1 ? ' mins' : ' min'
          }`}
          <StyledPrice>
            <span>
              {(-1, props.price.substr(props.price.indexOf('.') + 1))}
            </span>
          </StyledPrice>
        </StyledResultRow>
      </StyledDetails>
    </StyledResult>
  );
};

export default Result;
