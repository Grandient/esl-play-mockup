import { useDispatch } from 'react-redux';
import { swap } from '../features/filter/filterSlice';
function MatchFilter(){
  const dispatch = useDispatch();
    return (
      <div>
        <select className="date-select" onChange={(e) => dispatch(swap(e.target.value))}>
          <option className="date-option" value="asc">Date &#xf062;</option>
          <option className="date-option" value="desc">Date &#xf063;</option>
        </select>
      </div>
    )
  }

export default MatchFilter;