import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';
import Row from '../row';
import ItemDetails, { Record } from '../item-details/item-details';
import { SwapiServiceProvider } from '../swapi-service-context';
import './app.css';

import {
  PersonList,
  PlanetList,
  StarshipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails
} from '../sw-components';


// import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

export default class App extends Component {

  // swapiService = new SwapiService();
  swapiService = new DummySwapiService();

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
        <SwapiServiceProvider value={ this.swapiService }>
          <div className="stardb-app">
            <Header />

            <PersonDetails itemId={11}/>
            <PlanetDetails itemId={11}/>
            <StarshipDetails itemId={9}/>

            <PersonList />
            <PlanetList />
            <StarshipList />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
