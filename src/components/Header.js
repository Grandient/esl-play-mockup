import { useSelector, useDispatch } from 'react-redux';
import { eventFound } from '../features/downloadEvent/downloadEventSlice';
import {useEffect} from 'react';
import { fetchEvent } from '../features/downloadEvent/downloadEventSlice';

function Header(){
    const dispatch = useDispatch();
    useEffect(() => {
          dispatch(fetchEvent())
  
    }, [])
    const event = useSelector(eventFound);
    return (
      <div className="header-outer-container">
        <div className="header-inner-container">
          <h1 className="header-league-name">{event != undefined ? event.name : "LOADING"}</h1>
          <h2 className="header-start-date">{event != undefined ? event.start_date : "LOADING"}</h2>
        </div>
      </div>
    )
  }

export default Header;
