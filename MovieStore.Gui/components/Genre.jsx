import React, { Component } from "react";

class Genre extends Component {
    render() {
        return (
            <div genre-id={this.props.id} className="genre">
                {this.props.desc}
            </div>
        );
    }
}

export default Genre;