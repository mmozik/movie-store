import React, { Component } from "react";

const P = props => (
    <div className="paragraph">
        {
            props.title !== undefined ?
                <h2>{props.title}</h2> : ""
        }
        <span>{props.children}</span>
    </div>
);

class PTest extends Component {
    render() {
        const i = 2;

        return (
            <div>
                <P>Content</P>
                <P>{i === 1 ? "True" : "False"}</P>
                <P>Dir name: <strong>{__dirname}</strong> and file name: <strong>{__filename}</strong></P>
                <P title="Just content">This is the content!!!</P>
                <P title="evaluating adding in js">{1 + 1}</P>
            </div>
        );
    }
}

export default PTest;