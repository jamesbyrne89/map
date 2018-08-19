import React, { Component } from 'react';
import './App.css';
import Result from './components/Result';
import axios from 'axios';
import styled from 'styled-components';
import { JP_ENDPOINT, styles } from './constants';

const StyledApp = styled.main`
  font-family: nunito, helvetica, arial, sans-serif;
`;

const StyledSearchResults = styled.section`
  max-width: 500px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      sortedBy: 'distance'
    };
  }

  componentDidMount() {
    axios
      .get(JP_ENDPOINT)
      .then(res => {
        console.log(res.data.data[0]);
        this.setState({ results: res.data.data });
      })
      .catch(err => err);
  }

  displayResults = sort => {
    let sortedResults;
    if (sort === 'distance') {
      sortedResults = this.state.results.sort(
        (a, b) => a.distance - b.distance
      );
    }
    return sortedResults.map((result, i) => (
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
      </StyledApp>
    );
  }
}

export default App;
