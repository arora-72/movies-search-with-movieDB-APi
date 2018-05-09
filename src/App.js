import React, { Component } from 'react';
import './App.css';
import MovieRow from './movieRow.js'
import $ from 'jquery'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {}
    // console.log("this is my initializer")

    // const movies = [
    //   {id: 0,title: "Avengers: Infinity War",poster_src:"infinity.jpg", overview: "this is the first overview"},
    //   {id: 1,title: "The avengers",poster_src:"avengers.jpg", overview: "this is the second overview"},

    // ]
    

    // var moviesRow = []
    // movies.forEach((movie) => {
    //   console.log(movie.id)
    //   const movieRow = <MovieRow  movie={movie}/>
      
        
    //   moviesRow.push(movieRow)
    // })

    // this.state = {rows: moviesRow}

    this.performSearch("ant man")

  }
  performSearch(searchTerm) {
    console.log("perform search using movieDB")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=5717a33dc3459f672c1daf12b8907f6a&language=en-US&query="+searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("successfully fetched data")
        // console.log(searchResults)
        const results = searchResults.results
        // console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185/" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
         console.log("failed to fetch data")
      }
      
    })

  }

  seachChangeHandler(event){
    const searchTerm = event.target.value
    const boundObject = this
    boundObject.performSearch(searchTerm)
  }


  render() {
    return (
      <div>
          
          <table className="titleBar">
            <tbody>
              <tr>
              <td>
                <img alt="app icon" width="50" src = "movir_db_icon.png"/>
              </td>
              <td width = "8" />
              <td>
                <h1>MoviesDB search</h1>
              </td>
              </tr>
              
            </tbody>
          </table>

          <input style={{
            fontSize: 24,
            display:  'block',
            width: "99%",
            paddingTop: 8,
            paddingBotton: 8,
            paddingLeft:16
          }} onChange= {this.seachChangeHandler.bind(this)} placeholder="enter search term"/>

          {this.state.rows}

      </div>
    );
  }
}

export default App;
