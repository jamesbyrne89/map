import React from 'react';
import { Transition, animated } from 'react-spring';
import styled from 'styled-components';
import { styles } from '../constants';
import { calculateWalkTime, getSpaceType } from '../helpers';
import AvailabilityCircle from './AvailabilityCircle';
import propTypes from 'prop-types';

const StyledDetails = styled.aside`
  width: 100%;
  height: 80%;
  background: #fff;
  top: 0;
  left: 0;
  font-size: 1.25rem;
`;

const StyledDirectionsButton = styled.a.attrs({
  href: props =>
    `https://www.google.com/maps/dir/${props.coords.lat},${
      props.coords.lng
    }/51.55601,-0.2800539/data=!3m1!4b1!4m2!4m1!3e2`
})`
display block;
  width: 100%;
  border-radius: 4px;
  padding: 0 1.25em;
  line-height: 3;
  color: #fff;
  background-color: ${styles.jp_green};
  border: 0;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: ${styles.jp_light_green};
  }
`;

const StyledWalkDistance = styled.span`
  font-size: 1rem;
  img {
    margin-right: 0.5em;
    margin-bottom: -0.2em;
  }
`;

const StyledType = styled.span`
  color: ${styles.jp_green};
  font-weight: 700;
`;

const StyledInfoBox = styled.div`
  margin-top: 1rem;
  background: ${styles.jp_blue};
  padding: 1em;
  font-weight: bold;
  color: ${styles.jp_mid_blue};
`;

const extraStyles = {
  width: '390px',
  margin: '5px 10px',
  background: '#fff',
  position: 'absolute',
  right: 0,
  padding: '0 1em 1em',
  boxShadow: styles.box_shadow
};

const StyledCloseButton = styled.button`
  background: none;
  border: 0;
  position: absolute;
  top: 0.75em;
  right: 1.5em;
  height: 1rem;
  width: 1rem;
  cursor: pointer;
  &::before {
    content: url(images/close.svg);
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const StyledDetailsRow = styled.div`
  margin-top: 1rem;
  display: ${props => (props.display ? props.display : 'block')};
  justify-content: ${props => props.spacing};
  border-top: ${props => (props.topBorder ? '1px solid #efefef' : 'none')};
`;

const StyledThumbnail = styled.img.attrs({
  src: props =>
    props.photo.length > 0 ? props.photo[0] : 'images/placeholder_img.svg',
  alt: props => props.title
})`
  max-width: 120px;
  height: auto;
  margin: auto 0;
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

const DetailsPanel = props => {
  return (
    <Transition
      native
      from={{
        opacity: 0,
        transform:
          props.screenSize === 'mobile'
            ? 'translateY(100%)'
            : 'translateX(100%)'
      }}
      enter={{ opacity: 1, transform: 'translateX(0)' }}
      leave={{
        opacity: 0,
        transform:
          props.screenSize === 'mobile'
            ? 'translateY(100%)'
            : 'translateX(100%)'
      }}
    >
      {styles => (
        <animated.div
          style={{
            ...styles,
            ...extraStyles,
            bottom: props.screenSize === 'mobile' ? '0' : 'auto',
            top: props.screenSize === 'mobile' ? 'auto' : '0',
            height: props.screenSize === 'mobile' ? 'auto' : 'calc(100% - 10px)'
          }}
        >
          <StyledCloseButton onClick={props.closeDetails} />
          <StyledDetails>
            <StyledDetailsRow>
              <StyledType>{getSpaceType(props.title)}</StyledType>{' '}
              {props.title.substr(props.title.indexOf(' on '))}
            </StyledDetailsRow>
            <StyledDetailsRow display="flex" spacing="space-between">
              <StyledThumbnail photo={props.photos} />
              <AvailabilityCircle availability={props.availability} />
            </StyledDetailsRow>
            <StyledDetailsRow>
              <StyledDirectionsButton coords={props.coordinates}>
                Get directions to space
              </StyledDirectionsButton>
            </StyledDetailsRow>
            <StyledDetailsRow topBorder={true}>
              {props.type !== 'justpark' && (
                <StyledInfoBox>
                  This space is neither reservable nor operated by JustPark.
                  Click here to learn how to reserve a JustPark space.
                </StyledInfoBox>
              )}
            </StyledDetailsRow>
            <StyledDetailsRow />
            <StyledDetailsRow display="flex" spacing="space-between">
              <StyledWalkDistance>
                <img alt="walking distance" src="images/walking_icon.svg" />
                <span>{calculateWalkTime(props.distance)}</span>
              </StyledWalkDistance>
              <StyledStatus>
                <img alt="reservable" src="images/thunder.svg" />
                Reservable
              </StyledStatus>
            </StyledDetailsRow>
          </StyledDetails>
        </animated.div>
      )}
    </Transition>
  );
};

DetailsPanel.propTypes = {
  screenSize: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  photos: propTypes.array.isRequired,
  availability: propTypes.number.isRequired,
  type: propTypes.string.isRequired,
  closeDetails: propTypes.func.isRequired
};

export default DetailsPanel;
