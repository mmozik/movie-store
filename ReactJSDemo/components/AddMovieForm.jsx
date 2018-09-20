import React, { Component } from "react";

class AddMovieForm extends Component {
    handleClick(e) {
        const _name = this.name.value.trim();
        const _duration = this.duration.value.trim();
        const _release = this.release.value.trim();
        const _genres = [];

        // for (let i = 0; i < this.genre.length; i++) {
        //     const _tmp_g = this.genre[i];
        //     if (_tmp_g.checked) { _genres.push(_tmp_g.value); }
        // }

        this.props.savefn({
            name: _name,
            release: _release,
            duration: _duration,
            genres: _genres,
        });
        
        // clear all fields
    }

    render() {
        return (

            <div id="add-movie-form">
                {/* <form method="post" action="/movies/add-movie"> */}
                <div>
                    <span>Name:</span>
                    <input type="text" name="f_name" ref={input => this.name = input} />
                </div>
                <div>
                    <span>Duration:</span>
                    <input type="text" name="f_duration" ref={input => this.duration = input} />
                </div>
                <div>
                    <span>Genres:</span>
                    <label><input type="checkbox" name="f_genre" value="1" ref={input => this.genre = input} />Action</label>
                    <label><input type="checkbox" name="f_genre" value="2" ref={input => this.genre = input} />Adventure</label>
                    <label><input type="checkbox" name="f_genre" value="3" ref={input => this.genre = input} />Comedy</label>
                </div>
                <div>
                    <span>Relese Date:</span>
                    <input type="text" name="f_release_date" ref={input => this.release = input} />
                </div>
                <div>
                    <button type="button" onClick={e => this.handleClick(e)}>Save</button>
                    <button type="reset" onClick={this.props.cancelfn}>Cancel</button>
                </div>
                {/* </form> */}
            </div>

        );
    }
}

export default AddMovieForm;