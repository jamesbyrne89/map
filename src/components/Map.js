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

const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <StyledMap>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: props.coords.lat, lng: props.coords.lng }}
        {...props}
      >
        {props.isMarkerShown &&
          props.markers.map(marker => (
            <Marker
              key={marker.id}
              photo={marker.photos[0]}
              title={marker.title}
              distance={marker.distance}
              price={marker.price.formatted}
              streetview={marker.streetview}
              position={{
                lat: marker.coordinates.lat,
                lng: marker.coordinates.lng
              }}
              onClick={() => props.openDetails(marker)}
            />
          ))}
      </GoogleMap>
    </StyledMap>
  ))
);

export default MapComponent;
