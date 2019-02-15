import React from 'react';
import { NavLink } from 'react-router-dom';

export default class HeaderPanel extends React.Component {
  render() {
    return (
      <header className='Header'>
        <div className="container">
          <label className="btn-menu" htmlFor="hmt">
            <span className="first"></span>
            <span className="second"></span>
          </label>
          <ul className="hidden-menu">
            <li><NavLink activeClassName="active" exact to="/">Главная</NavLink></li>
            <li><NavLink activeClassName="active" to="/about">О профиле</NavLink></li>
          </ul>
        </div>
      </header>
    );
  }
}
