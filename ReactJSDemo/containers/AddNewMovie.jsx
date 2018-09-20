import React, { Component } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addMovie, showMovie } from '../actions'
import AddMovieForm from '../components/AddMovieForm.jsx'

const mapDispatchToProps = dispatch => 
{
    return {
        savefn: data => {
            dispatch(addMovie(data))
        },
        cancelfn: () => { dispatch(showMovie('add')) }
    }
}

const AddNewMovie = connect(
    mapDispatchToProps
)(AddMovieForm)

AddNewMovie.contextTypes = {
    store: PropTypes.object
}

export default AddNewMovie