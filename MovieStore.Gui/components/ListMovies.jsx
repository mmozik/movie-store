import React, { Component } from "react";
import PropTypes from "prop-types";
import Movie from "./Movie";

class ListMovies extends Component {
    render() {
        return (

            <div className="movies">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={e => this.props.addMovie({
                        id: 44,
                        name: "Movie 44",
                        relese: "02.07.1944",
                        duration: "00:01:57",
                        genres: [],
                    })}
                >Do you have guts?
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>movie name</th>
                            <th>movie release date</th>
                            <th>movie duration</th>
                            <th>genres</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.movies.map(m => <Movie key={m.id} {...m} />)}
                    </tbody>
                </table>
            </div>

        );
    }
}

ListMovies.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default ListMovies;