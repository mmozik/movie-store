import { REGISTER_FILE } from "../actions";

const init = {
    files: [],
};

export default function dragdropReducer(state = init, action) {
    switch (action.type) {
        case REGISTER_FILE:
            return {
                ...state,
                files: [...state.files, action.file],
            };
        default:
            return state;
    }
}