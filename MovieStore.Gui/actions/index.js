export const ADD_MOVIE_REQUEST = "ADD_MOVIE_REQUEST";
export const ADD_MOVIE_SUCCESS = "ADD_MOVIE_SUCCESS";
export const ADD_MOVIE_FAILURE = "ADD_MOVIE_FAILURE";

export const RECEIVE_MOVIES = "RECEIVE_MOVIES";
export const REGISTER_FILE = "REGISTER_FILE";

export const addMovie = data => ({
    type: ADD_MOVIE_SUCCESS,
    newMovie: data,
});

export const recieveMovies = data => ({
    type: RECEIVE_MOVIES,
    movies: data.movies,
});

export const registerFile = file => ({type: REGISTER_FILE, file});