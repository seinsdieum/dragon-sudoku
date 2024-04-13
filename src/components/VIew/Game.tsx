import style from './View.module.css'
import Grid from "../Grid/Grid";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Pos, RootReducerType} from "../../types";
import {generateHint} from "../../utils";

const Game = () => {

    const [pos, setPos] = useState<Pos>({row: 0, column: 0})


    const field = useSelector((s:RootReducerType) => s.field.matrix)
    const dispatch = useDispatch()


    const handleMovement = (e:React.KeyboardEvent<HTMLDivElement>) => {
        switch(e.code) {
            case 'ArrowUp': {
                if(pos.row > 0) setPos({...pos, row: pos.row - 1})
            }
                break;
            case 'ArrowDown': {
                if(pos.row < 8) setPos({...pos, row: pos.row + 1})

            }
                break;
            case 'ArrowLeft': {
                if(pos.column > 0) setPos({...pos, column: pos.column - 1})

            }
                break;
            case 'ArrowRight': {
                if(pos.column < 8) setPos({...pos, column: pos.column + 1})

            }
                break;
        }
    }

    const handleInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
        dispatch({type: 'ADD_CELL', payload: {i: pos.row, j: pos.column, value: +e.key}})
    }
    const handleRemoval = () => {
        dispatch({type: 'REMOVE_CELL', payload: {i: pos.row, j: pos.column, value: 0}})
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {

        if(e.altKey && e.which == 78) handleFieldUpdate()
        else if(e.altKey && e.which == 72) handleHintInput()
        else if(e.which >= 37 && e.which <= 40) handleMovement(e)
        else if(e.which >= 48 && e.which <= 57) handleInput(e)
        else if(e.which === 8) handleRemoval()
    }

    const handleHintInput = () => {
        dispatch({type: 'ADD_CELL', payload: {i: pos.row, j: pos.column, value: generateHint(pos.row, pos.column, field)}})
    }



    function handleFieldUpdate() {
        dispatch({type: 'GENERATE_FIELD', payload: -1})
    }

    function handleCellPress(cell: {row: number, column: number}) {
        setPos({...pos, row: cell.row, column: cell.column})
    }

    return (
        <div tabIndex={0} onKeyDown={(e) => handleKeyPress(e)} className={style.view}>
            <Grid onCellPress={handleCellPress} field={field} pos={pos} count={3}></Grid>
           <div className={style.menu}>
               <button onClick={handleFieldUpdate}>Новая игра</button>
               <button disabled={field[pos.row][pos.column].value !== 0} onClick={handleHintInput}> Подсказка </button>
           </div>
        </div>
    );
};

export default Game;