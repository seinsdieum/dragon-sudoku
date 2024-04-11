import {GameAction, StateType} from "./types";


const defaultState: StateType = {
    gameState: false,
    playHistory: []
}

export const START_GAME = 'START_GAME'

export const gameReducer = (state = defaultState, action: GameAction) => {
    switch(action.type) {
        case START_GAME:
            return 
        default: return state
    }
}