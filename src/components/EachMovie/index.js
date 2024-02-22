import {Link} from 'react-router-dom'

import './index.css'

const EachMovie = props => {
  const {movieData} = props
  const {id, overview, posterPath, releaseDate, title, voteAverage} = movieData

  return (
    <Link to={`/movie/${id}`} className="link-item">
      <li className="product-item">
        <div className="movie-details">
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={posterPath}
            className="movie-poster"
          />
          <div className="movie-info">
            <h2 className="movie-title">{title}</h2>
            <p className="movie-overview">{overview}</p>
            <p className="movie-release-date">Release Date: {releaseDate}</p>
            <p className="movie-vote-average">Vote Average: {voteAverage}</p>
            <button type="button">View Details</button>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default EachMovie
