import { connect } from 'react-redux'
import ListMovies from '../components/Movie.jsx'

const stateToProps = (state, ownProps) => 
{
    let _movie = {};
    state.movies.map((m) => {
        if(m.id == ownProps.match.params.id)
        {
            _movie = m
            return
        }
    })

    console.log(_movie)

    return {
        data: _movie,
        detail: true
    }
}

const DisplayMovieDetail = connect(
    stateToProps
)(ListMovies)

export default DisplayMovieDetail