import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';

import Row from '../row';
import ItemDetails, { Record } from '../item-details/item-details';
import SwapiService from '../../services/swapi-service';

import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <PersonDetails itemId={11}/>
          <PlanetDetails itemId={11}/>
          <StarshipDetails itemId={9}/>

          <PersonList>
              {({name}) => <span>{name}</span>}
          </PersonList>
          <PlanetList>
              {({name}) => <span>{name}</span>}
          </PlanetList>
          <StarshipList>
              {({name}) => <span>{name}</span>}
          </StarshipList>

        </div>
      </ErrorBoundry>
    );
  }
}
