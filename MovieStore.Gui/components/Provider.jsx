import React, { Component } from "react";
// import PropTypes from "prop-types";

class Provider extends Component {
    getChildContext() {
        return {
            store: this.props.store, // This corresponds to the `store` passed in as a prop
        };
    }

    render() {
        return this.props.children;
    }
}

// Provider.childContextTypes = {
//     store: PropTypes.object,
// };

export default Provider;