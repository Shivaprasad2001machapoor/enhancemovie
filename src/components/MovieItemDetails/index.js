import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apikey = '8759a957f6fb8771875033e02e9553cb'
    const jwtToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzU5YTk1N2Y2ZmI4NzcxODc1MDMzZTAyZTk1NTNjYiIsInN1YiI6IjY1YzQ3NzhmZjQ5NWVlMDE5NzBjMWY0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nbC76xIdPzos9Cp1thMIMbm9Qfzdxz_a845bN_XvTG8'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        adult: fetchedData.adult,
        backdropPath: fetchedData.backdrop_path,
        belongsToCollection: fetchedData.belongs_to_collection,
        budget: fetchedData.budget,
        id: fetchedData.id,
        imdbId: fetchedData.imdb_id,
        originalLanguage: fetchedData.original_language,
        originalTitle: fetchedData.original_title,
        overview: fetchedData.overview,
        popularity: fetchedData.popularity,
        posterPath: fetchedData.poster_path,
        releaseDate: fetchedData.release_date,
        revenue: fetchedData.revenue,
        runtime: fetchedData.runtime,
        status: fetchedData.status,
        tagline: fetchedData.tagline,
        title: fetchedData.title,
        video: fetchedData.video,
        voteAverage: fetchedData.vote_average,
        voteCount: fetchedData.vote_count,
      }

      this.setState({
        movieData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {movieData, apiStatus} = this.state
    return (
      <div>
        {apiStatus === apiStatusConstants.inProgress && (
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        )}

        {apiStatus === apiStatusConstants.success && (
          <div>
            <h1>{movieData.title}</h1>
            <p>{movieData.tagline}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.posterPath}`}
              alt={movieData.title}
            />
            <p>Overview: {movieData.overview}</p>
            <p>Release Date: {movieData.releaseDate}</p>
            <p>Runtime: {movieData.runtime} minutes</p>
            {/* Add more information as needed */}
          </div>
        )}

        {apiStatus === apiStatusConstants.failure && (
          <p>Failed to fetch movie data. Please try again.</p>
        )}
      </div>
    )
  }
}

export default MovieItemDetails
