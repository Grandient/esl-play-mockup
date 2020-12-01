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

export default MatchFilter;