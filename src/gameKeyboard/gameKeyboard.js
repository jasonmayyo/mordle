import classes from './gameKeyboard.module.css';
import React from 'react'
import {BsBackspace} from 'react-icons/bs'

const gameKeyboard = (props) => {

    const letterClicked = (letter) => {
        props.setLetter(letter)
    }

    let letters1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    let letters2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ]
    let letters3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    return (
        <div className={classes.keyboardContainer}>
            <div>
                {letters1.map( letter => (
                    <button className={classes.Key} key={letter} onClick={() => letterClicked(letter)}>{letter}</button>
                ))}
            </div>
            <div>
                {letters2.map( letter => (
                    <button className={classes.Key} key={letter} onClick={() => letterClicked(letter)}>{letter}</button>
                ))}
            </div>
            <div>
                <button className={classes.Enter} onClick={props.enterWord}> ENTER </button>
                {letters3.map( letter => (
                    <button className={classes.Key} key={letter} onClick={() => letterClicked(letter)}>{letter}</button>
                ))}
            <button className={classes.Backspace} onClick={props.removeLetter} > <BsBackspace/> </button>

            </div>
            
        </div>
       
    )
    
};


export default gameKeyboard