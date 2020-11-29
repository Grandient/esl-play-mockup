import React from 'react';
import { createStore } from 'redux';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header/>
      <MatchList/>
    </div>
  );
}

function Header(){
  return (
    <div className="header-outer-container">
      <div className="header-inner-container">
        <h1 className="header-league-name">Full name of league</h1>
        <h2 className="header-start-date">Start date of League</h2>
      </div>
    </div>
  )
}

function MatchFilter(){
  return (
    <div >
      <select className="date-select">
        <option className="date-option" value="asc">Date</option>
        <option className="date-option" value="desc">Date</option>
      </select>
    </div>
  )
}

function MatchList(){
  return (
    <div className="match-list-container">
      <MatchFilter/>
      <Match/>
      <Match/>
      <Match/>
    </div>
  )
}

function Match(){
  return (
    <div className="match-outer-container">
      <div className="match-inner-container">
        <div className="match-start">12:51</div>
        <div className="match-team-container winner">
          <div className="match-team">Black Lotus</div>
          <div className="points points-winner">4</div>
        </div>
        <div className="match-team-container loser">
          <div className="match-team">Team Chandra</div>
          <div className="points">2</div>
        </div>
      </div>
    </div>
  )
}

export default App;
