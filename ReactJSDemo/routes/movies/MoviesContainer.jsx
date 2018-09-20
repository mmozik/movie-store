import { connect } from "react-redux";
import ListMovies from "../../components/ListMovies";
import { addMovie } from "../../actions";

const mapStateToProps = state => ({
    movies: state.movies.allMovies,
});

const mapDispatchToProps = dispatch => ({
    addMovie: data => dispatch(addMovie(data)),
});

const MoviesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListMovies);

export default MoviesContainer;