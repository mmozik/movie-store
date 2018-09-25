import React, { Component } from "react";
import { globalAgent } from "https";

class DragDrop extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            haveSupport: true,
            files: [],
        };

        this.onOver = (e) => {
            e.target.style.backgroundColor = "#999999";
            e.target.style.color = "#edebec";
        };

        this.onOut = (e) => {
            e.target.style.backgroundColor = "#edebec";
            e.target.style.color = "#999999";
        };

        this.globalDrag = (e) => {
            const d = e.target.class;
            if (d !== "dropzone") {
                e.preventDefault();
                return false;
            }
            return true;
        };

        this.onDrop = (e) => {
            e.preventDefault();
            e.target.style.backgroundColor = "#edebec";
            e.target.style.color = "#999999";

            const files = e.dataTransfer.files;

            if (files !== null && files.length > 0) {
                const newFiles = this.state.files;

                for (let c = 0; c < files.length; c++) {
                    const f = files[c];
                    const newCount = newFiles.length + 1;
                    const nf = {
                        id: newCount,
                        name: f.name,
                        size: f.size,
                        type: f.type,
                        date: f.lastModifiedDate,
                        result: ((id) => {
                            const fr = new FileReader();
                            fr.onload = (e1) => {
                                this.setState({
                                    files: this.state.files.map(t => ({...t, result: id === t.id ? e1.target.result : t.result})),
                                });
                            };
                            fr.readAsDataURL(f);
                            return null;
                        })(newCount),
                    };

                    newFiles.push(nf);
                }

                this.setState({
                    files: newFiles,
                });
            }
        };
    }
    componentWillMount() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
            document.addEventListener("dragover", this.globalDrag);
            document.addEventListener("drop", this.globalDrag);
            this.setState({haveSupport: true});
        } else {
            this.setState({haveSupport: false});
        }
    }
    componentWillUnmount() {
        document.removeEventListener("dragover", this.globalDrag);
        document.removeEventListener("drop", this.globalDrag);
    }

    render() {
        return this.state.haveSupport ? (
            <div>
                <div className="row">
                    <div
                        className="col-md-9"
                        style={{
                            border: "1px solid #999",
                            margin: "10px auto",
                            padding: "12px",
                        }}
                    >
                        <div
                            className="dropzone"
                            style={{
                                border: "1px dashed #999",
                                height: "400px",
                                backgroundColor: "#edebec",
                                position: "relative",
                                top: "-1px",
                                textAlign: "center",
                                fontSize: "34px",
                                textTransform: "lowercase",
                                paddingTop: "180px",
                                color: "#999999",
                            }}
                            onDragOver={this.onOver}
                            onDragLeave={this.onOut}
                            onDrop={this.onDrop}
                        >
                        drag/drop files here
                        </div>
                    </div>
                    <div className="col-md-offset-3" />
                </div>
                {this.state.files.length > 0 && (
                    <div className="row">
                        {this.state.files.map(tf => (
                            <div className="col-md-3 col-xs-12" key={tf.id} style={{border: "1px solid #999", padding: "6px"}}>
                                {tf.result ? (<img src={tf.result} title={tf.name} style={{width: "100%", height: "120px"}} />) : (<span title={tf.name}>Loading...</span>)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ) : (
            <div className="row">
                <div className="col-xs-12">
                    <h2 className="text-danger">The File APIs are not fully supported in this browser.</h2>
                </div>
            </div>);
    }
}

export default DragDrop;