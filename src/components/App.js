// Libraries
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
function App() {
  return (
      <div className="app">
        <Header/>
        <MatchList/>
      </div>
  );

}
        //result = await getMatches('https://cors-anywhere.herokuapp.com/https://api.eslgaming.com/play/v1/leagues/177161/results')
        //this.setState({matches: result});
//
export default App;
