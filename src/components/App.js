// Libraries
import React from 'react';
import moment from 'moment';
import axios from 'axios';

//import { createStore } from 'redux';

// Import Models 
import getEvent from '../models/Event';
import getMatches from '../models/Matches';

// Components
import Header from './Header';
import MatchList from './MatchList';

// Import Styles
import '../styles/App.css';
import '../styles/Header.css';
import '../styles/MatchFilter.css';
import '../styles/Match.css';
import '../styles/MatchList.css';

// Example data
//import example from '../example.json';


// State:
// name: Name of the event. (String)
// start_date: Start date of the event. (String)
// matches: Contains data of each match in event. (Object Array)
// filter: Determines whether to sort by ascending or descending (String)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Loading..",
      start_date: "Loading...",
      matches: [],
      filter: "asc"
    }
    this.onChange = this.handleChange.bind(this);
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
  }

  // Handle change for sorting.
  handleChange(e) {
    console.log(e.target.value)
    this.setState({filter: e.target.value});
  }

  
  async componentDidMount() {
    let result = await getEvent('https://cors-anywhere.herokuapp.com/https://api.eslgaming.com/play/v1/leagues/177161')
    console.log(result)
    this.setState({start_date: result.start_date, name: result.name});
    result = await getMatches('https://cors-anywhere.herokuapp.com/https://api.eslgaming.com/play/v1/leagues/177161/results')
    this.setState({matches: result});
  }
  

  render() {
    return (
      <div className="app">
        <Header name={this.state.name} date={this.state.start_date}/>
        <MatchList filter={this.state.filter} matches={this.state.matches} onChange={this.onChange}/>
      </div>
    );
  }
}

export default App;
