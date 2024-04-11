import {createField} from "./utils";
import {ArrayType} from "./types";
const defaultState: { rand: number; matrix: ArrayType } = {
    matrix: createField(9),
    rand: Math.random()
}

export interface IndexCellType {
    i: number
    j: number
    value: number

}

export interface ActionType {
    type: string,
    payload: ArrayType | IndexCellType | -1
}

export const fieldReducer = (state = defaultState, action: ActionType) => {
    switch(action.type) {
        case 'ADD_CELL':
            if('i' in action.payload ) {
                state.matrix[action.payload.i][action.payload.j].value === action.payload.value
                    return {...state,
                        matrix: state.matrix.map((r, i) => {
                            return r.map((c, j) => {
                                if(('i' in action.payload) && i === action.payload.i && j === action.payload.j) return {valid: false, value: action.payload.value}
                                else return c
                            })
                        })
                    };
            }
            else return state;
        case 'REMOVE_CELL':
            if(('i' in action.payload)) {
                state.matrix[action.payload.i][action.payload.j].value === 0
                return {...state,
                    matrix: state.matrix.map((r, i) => {
                        return r.map((c, j) => {
                            if(('i' in action.payload) && i === action.payload.i && j === action.payload.j) return {valid: false, value: 0}
                            else return c
                        })
                    })
                };
            }
            else return state;
        case 'GENERATE_FIELD':
            return {...state,
                matrix: [...createField(9)]}
        case 'CHANGE_FIELD':
            if('length' in action.payload) return action.payload;
            return state
        default: return state;
    }
}
