import React, { Component } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    loading: true,
    person: null
  };

  componentDidMount() {
    this.updatePerson();
    console.log(this.state.person);
  }

  componentDidUpdate(prevProps){
    if (this.props.personId !== prevProps.personId){
      this.updatePerson();
    }
  }

  updatePerson () {
    const { personId } = this.props;
    this.setState({
      loading: true
    })
    if (!personId) {
      return;
    }

    this.swapiService
        .getPerson(personId)
        .then((person) => {
          this.setState({
             person,
             loading: false
           });
        })
  }
  
  render() {

    const { person, loading } = this.state;

    if (!this.state.person) {
      return <span>Select a person from a list</span>
    }

    const hasData = !loading;

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonView person={person}/> : null;

    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    )
  }
}

const PersonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor} = person;

  return (
    <React.Fragment>

      <img className="person-image" alt="character"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
