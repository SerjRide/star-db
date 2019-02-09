import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="../components/">
          StarDB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <a href="../components/">People</a>
        </li>
        <li>
          <a href="../components/">Planets</a>
        </li>
        <li>
          <a href="../components/">Starships</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
