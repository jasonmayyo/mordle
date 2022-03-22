import React from 'react'
import './gameTile.css'

const GameTile = (props) => {

    return (
        <div className='GameTileContainer'>
            {props.row.map( (letter, index) => {
                return <p className={props.rowReveal[index]} key={index}>{letter}</p>
            })}
        </div>
    )
}


export default GameTile