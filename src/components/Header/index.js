import {Link} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'

import './index.css'

const Header = () => (
  <MovieContext.Consumer>
    {value => {
      const {searchInput, onChangeSearchInput} = value
      return (
        <nav className="nav-header">
          <div className="blog-container">
            <h1 className="blog-title">movieDB</h1>
          </div>
          <div>
            <ul className="nav-menu">
              <Link className="nav-link" to="/">
                <button type="button">Popular</button>
              </Link>
              <Link className="nav-link" to="/top-rated">
                <button type="button">Top Rated</button>
              </Link>
              <Link className="nav-link" to="/upcoming">
                <button type="button">Upcoming</button>
              </Link>
            </ul>
          </div>
          <div>
            <input
              type="text"
              value={searchInput}
              onChange={onChangeSearchInput}
              placeholder="Search..."
            />
          </div>
        </nav>
      )
    }}
  </MovieContext.Consumer>
)

export default Header
