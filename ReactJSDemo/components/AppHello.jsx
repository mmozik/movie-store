import React, { Component } from "react";
import PropTypes from "prop-types";

// const Button = props => (
//   <button onClick={props.handleClick}>{props.children}</button>
// );

const Button = props => (<button value="firstBtn" onClick={this.props.handleClick}>{this.props.children}</button>);

class AppHello extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: null,
        };

        this.onClick = (e) => { this.setState({value: e.target.value}); };
    }
    render() {
        return (
            <div>
                <Button handleClick={this.onClick}>Give me some</Button>
                <div>Current value is: <strong>{this.state.value}</strong></div>
            </div>
        );
    }
}

AppHello.contextTypes = {
    store: PropTypes.object,
};

export default AppHello;