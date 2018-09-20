import { SHOW_MOVIE } from "../actions";

const init = {

};

export default function dropdowntestReducer(state = init, action) {
    switch (action.type) {
        case SHOW_MOVIE:
            return action.display;
        default:
            return state;
    }
}