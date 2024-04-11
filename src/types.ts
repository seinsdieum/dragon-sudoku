
export type Pos = {
    row: number,
    column: number,
}


export type CellType = {
    valid: boolean
    value: number
}

export type MatchType = {
    failures: number
    startField: ArrayType
    win: boolean
    player: string
}


export type StateType = {
    gameState: MatchType | false

    playHistory: MatchType[]
}

export type GameAction = {
    type: string,
    payload: void
}


export type ArrayType = Array<Array<CellType>>