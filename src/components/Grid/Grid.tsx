import style from './Grid.module.css'
import Cell from "../Cell/Cell";
import {ArrayType, Pos} from "../../types";
import {checkColumn, checkRow, checkSquare} from "../../utils";
import {useEffect} from "react";


type GridProps = {
    pos: Pos
    count: number
    field: ArrayType
    check?: boolean
    help?: boolean

    onCellPress?(cell: Pos): void
    onError?(): void

}


const Grid = (props: GridProps) => {



    function checkHighlighting(i: number, j: number): boolean {
        return (i === props.pos.row
            || j === props.pos.column
            || (Math.floor(i / 3) === Math.floor(props.pos.row / 3)
                && Math.floor(j / 3) === Math.floor(props.pos.column / 3)
            )
        )
    }

    function checkProps(i: number, j: number): boolean {
        const bb: boolean = checkRow(i, j, props.field) && checkColumn(i, j, props.field) && checkSquare(i, j, props.field)
        return bb;
    }

    useEffect(() => {

    }, [])

    function checkCrossInvalid(i: number, j: number): boolean {

        return checkHighlighting(i,j) && !checkProps(props.pos.row, props.pos.column) && (props.field[props.pos.row][props.pos.column].value !== 0)
    }

    return (
        <div className={style.grid}>
            {props.field.map((c, index) => {
                return c.map((c1, j) => {



                    return <Cell
                        onClick={() => {
                            props.onCellPress?.({row: index, column: j})
                        }
                        }
                        valid={!props.check ? checkProps(index, j) : true}
                        key={`r${index}c${j}`}
                        pos={props.pos}
                        crossInvalid={ props.check ? checkCrossInvalid(index,j) : false}
                        cell={c1}
                        coord={{i: index, j: j}}
                        highlighted={checkHighlighting(index, j)}
                        current={false}
                        focused={props.field[props.pos.row][props.pos.column].value === c1.value && c1.value !== 0}
                    ></Cell>
                })
            })}
            <Cell
                current
                cell={{value: 0, valid: true}}
                userPos={props.pos}
            >

            </Cell>
        </div>
    );
};

export default Grid;