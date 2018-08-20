import React, { Component } from 'react';
import './App.css';
import Result from './components/Result';
import MyMapComponent from './components/Map';
import axios from 'axios';
import styled from 'styled-components';
import { JP_ENDPOINT } from './constants';

const StyledApp = styled.main`
  font-family: nunito, helvetica, arial, sans-serif;
  display: flex;
`;

const StyledSearchResults = styled.section`
  max-width: 500px;
`;

const getCurrentLocation = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      sortedBy: 'distance',
      currentLocation: { lat: 51.55601, lng: -0.2800539 }
    };
  }

  componentDidMount() {
    console.count('mounted');
    axios
      .get(JP_ENDPOINT)
      .then(res => {
        console.log(res.data.data[0]);
        this.setState({ results: res.data.data });
      })
      .catch(err => err);

    getCurrentLocation().then(pos =>
      this.setState(
        {
          currentLocation: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
        },
        () => {
          console.log('updated location');
        }
      )
    );
  }

  displayResults = sort => {
    let sortedResults;
    if (sort === 'distance') {
      sortedResults = this.state.results.sort(
        (a, b) => a.distance - b.distance
      );
    }
    return sortedResults
      .slice(0, 10)
      .map(result => (
        <Result
          key={result.id}
          photo={result.photos[0]}
          title={result.title}
          distance={result.distance}
          price={result.price.formatted}
        />
      ));
  };

  render() {
    return (
      <StyledApp>
        <StyledSearchResults>
          {this.displayResults(this.state.sortedBy)}
        </StyledSearchResults>
        <MyMapComponent
          coords={this.state.currentLocation}
          markers={this.state.results}
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY
          }`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </StyledApp>
    );
  }
}

export default App;
