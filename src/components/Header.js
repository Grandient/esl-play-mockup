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

export default Header;