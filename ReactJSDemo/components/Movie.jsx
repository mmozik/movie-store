import React, { Component } from "react";
import { Link } from "react-router-dom";
import Genre from "./Genre";

class Movie extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.relese}</td>
                <td>{this.props.duration}</td>
                <td>{this.props.genres.map(genre => <Genre key={genre.id} {...genre} />)}</td>
                <td><Link to={`/movies/${this.props.id}`}>Detail</Link></td>
            </tr>
        );
    }
}

export default Movie;