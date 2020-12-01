import Match from './Match';
import MatchFilter from './MatchFilter';

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

  export default MatchList;