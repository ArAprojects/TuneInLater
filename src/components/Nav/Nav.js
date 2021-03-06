import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutUser, toggleBtnStatus } from '../actions';
import { connect } from 'react-redux';
import './Nav.css';
import headphones from './headphones.svg'

export class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }
  }

  handleSearch(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  helperFunction = () => {
    const { toggleBtnStatus, toggleFavoriteBtnReducer, fetchUserFavorites, currentUser } = this.props;
    toggleBtnStatus(toggleFavoriteBtnReducer);
    fetchUserFavorites(currentUser.id);
  }

  render() {
    console.log(this.props)
    const { currentUser, logoutUser, newSearch, toggleFavoriteBtnReducer, toggleBtnStatus } = this.props;
    const user = currentUser.name
    return (
      <nav>
        <div className="icon-title">
          <h1>TuneInLater</h1>
          <img alt="headphones" src={headphones}></img>
        </div>
        <div className="form-container">
        <div className="search-container">
          <input
            className="audio-search"
            type="text"
            name="search"
            placeholder="Search for audiobooks..."
            value={this.state.search}
            onChange={e => this.handleSearch(e)}
            / >
          <button className="nav-button nav-search" disabled={!this.state.search} onClick={() => newSearch(this.state.search) }><h2>Submit</h2></button>
        </div>
        <select onChange={(e) => newSearch(e.target.value)} className="select-container">
          <option value="">Select Genre:</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
          <option value="Fiction">Fiction</option>
          <option value="Romance">Romance</option>
          <option value="Adventure">Adventure</option>
          <option value="Non fiction">Non-Fiction</option>
        </select>
        {toggleFavoriteBtnReducer === 'favorite' && <NavLink to='/favorites' onClick={this.helperFunction}>
          <button className="nav-button nav-show-favorites"><h2>Show Favorites</h2></button>
        </NavLink> }
        {toggleFavoriteBtnReducer === 'showAll' && <NavLink to='/home' onClick={() => toggleBtnStatus(toggleFavoriteBtnReducer)}>
          <button className="nav-button"><h2>Show All</h2></button>
        </NavLink>}
        <div className="Nav_login">
          <h2>Welcome, {user ? user.charAt(0).toUpperCase() + user.slice(1) : ''}</h2>
          <NavLink exact to='/' className="NavLink_logout">
            <p className="logout" onClick={logoutUser} className="p-logout">Log out</p>
          </NavLink>
        </div>
        </div>
      </nav>
    );
  };
}

export const mapStateToProps = state => ({
  toggleFavoriteBtnReducer: state.toggleFavoriteBtnReducer
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  toggleBtnStatus: (status) => dispatch(toggleBtnStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
