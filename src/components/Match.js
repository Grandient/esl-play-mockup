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

export default Match;
  