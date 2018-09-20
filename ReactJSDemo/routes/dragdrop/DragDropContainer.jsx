import { connect } from "react-redux";
import { registerFile } from "../../actions";

import DragDrop from "../../components/DragDrop";

const stateToProps = state => ({
    registeredFiles: state.dragdrop.files,
});

const mapDispatchToProps = dispatch => ({
    addFile: file => dispatch(registerFile(file)),
});

const DragDropContainer = connect(
    stateToProps,
    mapDispatchToProps,
)(DragDrop);

export default DragDropContainer;