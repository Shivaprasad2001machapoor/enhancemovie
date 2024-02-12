import React from 'react'

const MovieContext = React.createContext({
  searchInput: '',
  onChangeSearchInput: () => {},
})

export default MovieContext
