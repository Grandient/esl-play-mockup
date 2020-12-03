
import Match from './Match';
import MatchFilter from './MatchFilter';
import { useSelector, useDispatch } from 'react-redux';
import { matchesFound, fetchMatches } from '../features/downloadMatches/downloadMatchesSlice';
import { selectFilter } from '../features/filter/filterSlice';
import {useEffect} from 'react';

function MatchList(){
    const dispatch = useDispatch();
    useEffect(() => {
          dispatch(fetchMatches());

    }, [])
    const matches = useSelector(matchesFound);
    const filter = useSelector(selectFilter)
    let loading = true;
    let temp = [...matches];
    if(matches != []){
      loading = false;
      if(filter == "asc"){
        temp.sort(function(a, b){
          return new Date(b.start) - new Date(a.start)
        })
      } else {
        temp.sort(function(a, b){
          return new Date(a.start) - new Date(b.start)
        })
      }
    }

    return (
      <div className="match-list-container">
        <MatchFilter/>
        {loading ? <div>LOADING...</div> : 
        <div>
          {temp.map(match => (
            <Match match={match}/>
          ))}
        </div>}
      </div>
    )
  }

  export default MatchList;