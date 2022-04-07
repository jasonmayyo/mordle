import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Game from '../game/game'

function GameWrapper(props){
    const {name} = useParams()
    const {word} = useParams()
    return <Game name={name} word={word} words={props.words} />
};

export default GameWrapper;