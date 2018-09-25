import { ADD_MOVIE_SUCCESS, RECEIVE_MOVIES, SHOW_MOVIE } from "../actions";

const init = {
    allMovies: [
        {
            id: 1,
            name: "Timemachine",
            relese: "20.01.2002",
            duration: "00:01:54",
            genres: [
                {
                    id: 1,
                    name: "action",
                    desc: "Action",
                },
                {
                    id: 3,
                    name: "scf",
                    desc: "Science Fiction",
                },
            ],
        },
        {
            id: 2,
            name: "Green Mile",
            relese: "02.10.1999",
            duration: "00:02:44",
            genres: [
                {
                    id: 7,
                    name: "drama",
                    desc: "Drama",
                },
                {
                    id: 3,
                    name: "bio",
                    desc: "Bigraphy",
                },
            ],
        },
        {
            id: 3,
            name: "Footlose",
            relese: "02.07.1984",
            duration: "00:01:35",
            genres: [],
        },
    ],
    status: {
        list: null,
        add: null,
    },
};

export default function moviesReducer(state = init, action) {
    switch (action.type) {
        case ADD_MOVIE_SUCCESS: {
            return {
                ...state,
                allMovies: [...state.allMovies, action.newMovie],
            };
        }
        case RECEIVE_MOVIES: {
            return {
                ...state,
                allMovies: action.movies,
            };
        }
        default: return state;
    }
}