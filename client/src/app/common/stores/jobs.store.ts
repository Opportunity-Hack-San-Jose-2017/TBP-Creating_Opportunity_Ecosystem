
import { Action } from './action';
export function ideas(state: any = [], action: Action) {
    switch (action.type) {
        case 'LOAD_IDEAS':
            return action.payload;
        default:
            return state;
    }
}