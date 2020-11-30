import React from 'react';
//import { createStore } from 'redux';
import axios from 'axios';
import './App.css';
//import example from '../src/example.json'
import moment from 'moment'

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
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({filter: e.target.value});
  }
  
  componentDidMount() {
    let team_urls = [];
    let name = "";
    let matches = [];
    let start_date = "";
    axios.get('https://cors-anywhere.herokuapp.com/https://api.eslgaming.com/play/v1/leagues/177161')
        .then(function (response) {
          // handle success
          name = response.data.name.full;
          start_date = new Date(response.data.timeline.checkIn.begin).toString();
          start_date = moment(start_date).format('Do MMMM YYYY')
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })

    axios.get('https://cors-anywhere.herokuapp.com/https://api.eslgaming.com/play/v1/leagues/177161/results')
        .then(function (response) {
          // handle success
          response.data.forEach(element => {
            let start = element.beginAt;
            let team1 = element.participants[0].id;
            let team1_points = element.participants[0].points[0];
            let team2 = element.participants[1].id;
            let team2_points = element.participants[1].points[0];
            let winner = element.participants[0].place;
            let result = false;
            if(winner == 1){ 
              result = true;
            }
            let team_url = "https://cors-anywhere.herokuapp.com/https://api.eslgaming.com/play/v1/teams/"
            team_urls.push(team_url + team1, team_url+team2)
            let date = moment(start).format('hh:mm')
            matches.push({start: start, team1: team1, team1_points: team1_points, team2: team2, team2_points: team2_points, winner: result, date: date})
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(async function () {
          console.log(team_urls)
          let promises = []
          let results = []
          team_urls.forEach(element => {
            promises.push(axios.get(element).then(response =>{
              results.push(response)
            }).catch(() => results.push("Team Not Found."))
            )
          })
          await Promise.all(promises).then(() => {
            let team_arr = []
            for (let index = 0; index < results.length; index++) {
              let t1 = results[index];
              let t2 = results[index + 1];
              if(t1 != "Team Not Found."){
                t1 = results[index].data.name;
              }
              if(t2 != "Team Not Found."){
                t2 = results[index+1].data.name;
              }              
              team_arr.push({team1: t1, team2: t2})
              index++;
            }

            for(let index = 0; index < matches.length; index++){
              matches[index].team1 = team_arr[index].team1;
              matches[index].team2 = team_arr[index].team2;
            }
          })
          console.log(matches);
          this.setState({matches: matches, start_date: start_date, name: name})
        }.bind(this));
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

function Header(props){
  return (
    <div className="header-outer-container">
      <div className="header-inner-container">
        <h1 className="header-league-name">{props.name}</h1>
        <h2 className="header-start-date">{props.date}</h2>
      </div>
    </div>
  )
}

function MatchFilter(props){
  return (
    <div>
      <select className="date-select" onChange={(e) => props.onChange(e)}>
        <option className="date-option" value="asc">Date &#xf062;</option>
        <option className="date-option" value="desc">Date &#xf063;</option>
      </select>
    </div>
  )
}

function MatchList(props){
  let loading = true;
  let matches = props.matches;
  if(matches != []){
    loading = false;
  }
  if(props.filter == "asc"){
    matches.sort(function(a, b){
      return new Date(b.start) - new Date(a.start)
    })
  } else {
    matches.sort(function(a, b){
      return new Date(a.start) - new Date(b.start)
    })
  }

  return (
    <div className="match-list-container">
      <MatchFilter onChange={props.onChange}/>
      <div>
        {matches.map(match => (
          <Match match={match}/>
        ))}
      </div>
    </div>
  )
}

function Match(props){
  let t1win = false;
  let t2win = false;

  if(props.match.winner){
    t1win = true;
  } else {
    t2win = true;
  }

  return (
    <div className="match-outer-container">
      <div className="match-inner-container">
        <div className="match-start">{props.match.date}</div>
        <div className={t1win ? "match-team-container winner" : "match-team-container loser"}>
          <div className="match-team">{props.match.team1}</div>
          <div className={t1win ? "points points-winner" : "points"}>{props.match.team1_points}</div>
        </div>
        <div className={t2win ? "match-team-container winner" : "match-team-container loser"}>
          <div className="match-team">{props.match.team2}</div>
          <div className={t2win ? "points points-winner" : "points"}>{props.match.team2_points}</div>
        </div>
      </div>
    </div>
  )
}

export default App;
