import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import styled from 'styled-components';

const StyledMap = styled.div`
  width: 100%;
`;



const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <StyledMap>
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: props.coords.lat, lng: props.coords.lng }}>
        {props.isMarkerShown && (
          props.markers.map((marker) => (
          <Marker key={marker.id} position={{ lat: marker.coordinates.lat, lng: marker.coordinates.lng }} />
          ))
        )}
      </GoogleMap>
    </StyledMap>
  ))
);

export default MyMapComponent;
