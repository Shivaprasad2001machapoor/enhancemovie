import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import MovieItemDetails from './components/MovieItemDetails'
import NotFound from './components/NotFound'

import './App.css'
import MovieContext from './context/MovieContext'

class App extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    console.log(searchInput)

    return (
      <BrowserRouter>
        <MovieContext.Provider
          value={{searchInput, onChangeSearchInput: this.onChangeSearchInput}}
        >
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={UpComing} />
            <Route exact path="/movie/:id" component={MovieItemDetails} />
            <Route component={NotFound} />
          </Switch>
        </MovieContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
