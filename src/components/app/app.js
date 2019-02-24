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


import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

export default class App extends Component {

  // swapiService = new SwapiService();


  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService : new DummySwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {

      const Service = swapiService instanceof SwapiService ?
                                         DummySwapiService : SwapiService;
      console.log('switch to', Service.name);

      return {
        swapiService: new Service()
      };
    });
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
        <SwapiServiceProvider value={ this.state.swapiService }>
          <div className="stardb-app">
            <Header onServiceChange={ this.onServiceChange }/>

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
