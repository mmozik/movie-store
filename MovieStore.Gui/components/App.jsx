import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

import Movies from "../routes/movies/MoviesContainer";
import DragDrop from "../routes/dragdrop/DragDropContainer";

import Home from "../routes/Home";
import About from "../routes/About";
import Contact from "../routes/Contact";

class App extends Component {
    render() {
        return (
            <Router>
                <div style={{padding: "70px 0"}}>
                    <Header />
                    <div className="container body-content">
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/movies" component={Movies} />
                        <Route path="/drag-drop-test" component={DragDrop} />
                        <Route path="/contact" component={Contact} />
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;