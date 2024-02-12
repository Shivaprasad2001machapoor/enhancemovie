import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EachMovie from '../EachMovie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UpComing extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apikey = '8759a957f6fb8771875033e02e9553cb'
    const jwtToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzU5YTk1N2Y2ZmI4NzcxODc1MDMzZTAyZTk1NTNjYiIsInN1YiI6IjY1YzQ3NzhmZjQ5NWVlMDE5NzBjMWY0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nbC76xIdPzos9Cp1thMIMbm9Qfzdxz_a845bN_XvTG8'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(movie => ({
        adult: movie.adult,
        backdropPath: movie.backdrop_path,
        id: movie.id,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        title: movie.title,
        video: movie.video,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      }))

      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {moviesList} = this.state
    return (
      <div className="home-container">
        <ul className="movies-list">
          {moviesList.map(movie => (
            <EachMovie movieData={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default UpComing
