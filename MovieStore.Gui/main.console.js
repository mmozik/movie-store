import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import reactjsdemoApp from './reducers'
let appStore = createStore(reactjsdemoApp)

import { addMovie, showMovie } from './actions'

console.log(appStore.getState())

let uns = appStore.subscribe(() => console.log(appStore.getState()))

appStore.dispatch(addMovie({name: 'King Arthur', release: '12.12.2016', duration: '02:14:12', genres: [{
    genreid: 3,
    name: "bio",
    desc: "Bigraphy"
}]}))

appStore.dispatch(addMovie({name: 'Tears of the sun', release: '02.02.2000', duration: '01:44:12', genres: [{
    genreid: 2,
    name: "drama",
    desc: "Drama"
}]}))

appStore.dispatch(showMovie('add'))
appStore.dispatch(showMovie('list'))

uns()