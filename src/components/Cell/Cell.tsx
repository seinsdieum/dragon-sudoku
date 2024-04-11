import style from './Cell.module.css'
import {CellType, Pos} from "../../types";


type PropsType = {
    index: number
    cell: CellType

    pos: Pos
    coord: {i: number, j: number}
    valid: boolean
    highlighted: boolean
    current: boolean
    userPos?: Pos
    onClick?():void
    focused?: boolean
    crossInvalid: boolean
}

const Cell = (props: PropsType) => {


    return (
        <div onClick={props.onClick} className={`
        ${style.cell} 
        ${
            props.coord ? `${(props.coord.i+1) % 3 === 0 ? style.line__h : ''}
        ${(props.coord.j+1) % 3 === 0 ? style.line__v : ''}
        ${props.coord.i === 0 ? style.start__h : ''}
        ${props.coord.j === 0 ? style.start__v : ''}`
                : ''
        }
        ${!props.valid ? style.invalid : ''}
        ${props.highlighted ? style.highlighted : ''}
        ${props.current ? style.current : ''}
        ${props.focused ? style.focused : ''}
        ${props.crossInvalid ? style.cross_invalid : ''}
        
        
        
         `}
        style={props.userPos ? {
            transform: `translateX(calc(${props.userPos.column}*100%)) translateY(calc(${props.userPos.row}*100%))`
        } : {} }>
            {props.cell && props.cell.value === 0 ? '' : props.cell.value}
        </div>
    );
};

export default Cell;