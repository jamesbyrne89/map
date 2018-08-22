import React, { Component } from 'react';
import './App.css';
import MapComponent from './components/Map';
import DetailsPanel from './components/DetailsPanel';
import axios from 'axios';
import styled from 'styled-components';
import { JP_ENDPOINT } from './constants';
import { debounce } from './helpers';

const StyledApp = styled.main`
  font-family: nunito, helvetica, arial, sans-serif;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  * {
    box-sizing: border-box;
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      currentLocation: { lat: 51.55601, lng: -0.2800539 },
      detailsPanelOpen: false,
      details: {},
      screenSize: 'mobile'
    };
  }

  addResizeListener = () => {
    const updateWindowSize = debounce(function() {
      if (window.innerWidth < 667) {
        this.setState({ screenSize: 'mobile' });
        return;
      }
      if (window.innerWidth >= 667 && window.innerWidth < 1025) {
        this.setState({ screenSize: 'tablet' });
        return;
      }
      this.setState({ screenSize: 'desktop' });
    }, 250).bind(this);
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
  };

  componentDidMount() {
    this.addResizeListener();

    const cachedResults = sessionStorage.getItem('results');
    if (cachedResults) {
      this.setState({ results: JSON.parse(cachedResults) });
      return;
    }
    axios
      .get(JP_ENDPOINT)
      .then(res => {
        console.log(res.data.data[0]);
        this.setState({ results: res.data.data });
        this.cacheResults(res.data.data);
      })
      .catch(err => err);
  }

  cacheResults = results => {
    sessionStorage.setItem('results', JSON.stringify(results));
  };

  openDetails = props => {
    console.log(props);
    this.setState({ detailsPanelOpen: true, details: props });
  };

  closeDetails = () => {
    this.setState({ detailsPanelOpen: false });
  };
  render() {
    const {
      currentLocation,
      details,
      detailsPanelOpen,
      results,
      screenSize
    } = this.state;
    return (
      <StyledApp>
        <MapComponent
          coords={currentLocation}
          openDetails={this.openDetails}
          markers={results}
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY
          }`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh`, width: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onClick={this.closeDetails}
        />
        {detailsPanelOpen && (
          <DetailsPanel
            {...details}
            screenSize={screenSize}
            closeDetails={this.closeDetails}
          />
        )}
      </StyledApp>
    );
  }
}

export default App;
