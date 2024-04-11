import {ArrayType} from "./types";


export function checkRow(i: number, j: number, field: ArrayType): boolean {
    if(field[i][j].value === 0) return true
    if(field[i].filter(s => s.value === field[i][j].value).length === 1) return true
    else {
        return false;
    }
}

export function checkColumn(i: number, j: number, field: ArrayType):boolean {
    if(field[i][j].value === 0) return true
    const value = field[i][j].value

    for(let i1 = 0; i1< field[i].length; i1++) {
        if(field[i1][j].value === value && i1 !== i) {
            return false;
        }
    }

    return true
}

export function checkSquare(i: number, j: number, field: ArrayType): boolean {
    const pos = {i: Math.floor(i / 3), j: Math.floor(j / 3)}


    for(let x = 0; x < 9; x++) {
        for(let y = 0; y < 9; y++) {
            if(Math.floor(x / 3) === pos.i && Math.floor(y / 3) === pos.j) {
                if(field[x][y].value === field[i][j].value && (x !== i || y !== j)) {
                    return false;
                }
            }
        }
    }
    return true
}

export function createField(count: number): ArrayType {
    const arr = []

    for(let i = 0; i < count; i++) {
        const sArr = []
        for(let j = 0; j < count; j++) {
            sArr.push({valid: true, value: 0})
        }
        arr.push(sArr)
    }


    for(let i = 0; i < count; i++) {
        for(let j = 0; j < count; j++) {

            if(getRandomInt(1,4) === 1) {
                const sa: number = getRandomInt(1,9)

                arr[i][j] = {valid: true, value: sa};

                arr[i][j] =  {valid:true, value: (checkRow(i,j, arr) && checkColumn(i,j,arr) && checkSquare(i,j, arr)) ? sa : 0}
            }
        }
    }
    return arr
}

export function generateHint(i: number, j: number, field: ArrayType): number {


    for(let some = 1; some <= 9; some++) {
        field[i][j].value = some;
        if(checkRow(i,j, field) && checkColumn(i,j,field) && checkSquare(i,j,field) ) {
            field[i][j].value = 0;
            return some;
        }
    }

    field[i][j].value = 0;

    return 0
}

export function getRandomInt(min: number, max:number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}