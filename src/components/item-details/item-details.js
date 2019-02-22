import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button/error-button";
import Spinner from '../spinner';

const Record = ({ item, field, label }) => {
  return(
    <li className="list-group-item">
      <span className="term">{ label } </span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: {},
    loading: true,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({loading:true});
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false,
          image: getImageUrl(item)
        });
      });
  }

  render() {
    const { item, loading, image } = this.state;
    const { children } = this.props;

    const hasData = !loading;

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemView
                                item = { item }
                                image = { image }
                                children = { children }/> : null;

    return (
      <div className="item-details card">
        {spinner}
        {content}
      </div>
    );
  };
};

const ItemView = ({ item, image, children }) => {

  const { id, name, gender,
            birthYear, eyeColor } = item;

  return (
    <React.Fragment>
      <img className="item-image"
        src={ image }
        alt="character"/>
      <div className="card-body">
        <h4>{ name }</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, { item });
            })
          }
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );

}
