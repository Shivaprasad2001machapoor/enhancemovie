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

class Home extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
    currentPage: 1,
    totalPages: 1,
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async (page = 1) => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apikey = '8759a957f6fb8771875033e02e9553cb'
    const jwtToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzU5YTk1N2Y2ZmI4NzcxODc1MDMzZTAyZTk1NTNjYiIsInN1YiI6IjY1YzQ3NzhmZjQ5NWVlMDE5NzBjMWY0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nbC76xIdPzos9Cp1thMIMbm9Qfzdxz_a845bN_XvTG8'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=${page}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
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
          currentPage: page,
          totalPages: fetchedData.total_pages,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  handleNextPage = () => {
    const {currentPage, totalPages} = this.state
    const nextPage = currentPage + 1
    if (nextPage <= totalPages) {
      this.getMovies(nextPage)
    }
  }

  handlePrevPage = () => {
    const {currentPage} = this.state
    const prevPage = currentPage - 1
    if (prevPage >= 1) {
      this.getMovies(prevPage)
    }
  }

  render() {
    const {moviesList, apiStatus, currentPage, totalPages} = this.state

    return (
      <div className="home-container">
        {apiStatus === apiStatusConstants.inProgress && (
          <Loader type="Oval" color="#00BFFF" height={80} width={80} />
        )}

        {apiStatus === apiStatusConstants.success && (
          <>
            <ul className="movies-list">
              {moviesList.map(movie => (
                <EachMovie movieData={movie} key={movie.id} />
              ))}
            </ul>

            <div className="pagination">
              <button
                type="button"
                onClick={this.handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>{currentPage}</span>
              <button
                type="button"
                onClick={this.handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}

        {apiStatus === apiStatusConstants.failure && (
          <p>Error fetching movies</p>
        )}
      </div>
    )
  }
}

export default Home
