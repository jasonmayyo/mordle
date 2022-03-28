import './gameKeyboard.css';
import React, { Component } from 'react'
import {BsBackspace, BsConeStriped} from 'react-icons/bs'

class gameKeyboard extends Component {

    letterClicked = (letter) => {
        this.props.setLetter(letter)
    }

    state = {
        letters:[
        {
            Letter: 'Q',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'W',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'E',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'R',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'T',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'Y',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'U',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'I',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'O',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'P',
            Status: 'KeyBoardD',
            EndLetter: 'EndLetter'
        },
        {
            Letter: 'A',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'S',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'D',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'F',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'G',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'H',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'J',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'K',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'L',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'Z',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'X',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'C',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'V',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'B',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'N',
            Status: 'KeyBoardD'
        },
        {
            Letter: 'M',
            Status: 'KeyBoardD'
        },

    ]
}
   
    updateKeyboard = () => {
        const updatedLetters = [...this.state.letters]
        const guessedWord = this.props.guessedWord
        const colorLetters = this.props.wordColors

        this.props.enterWord()

        guessedWord.forEach( (guessedLetter, guessedIndex) => {
            const index = updatedLetters.map(Letter => Letter.Letter).indexOf(guessedLetter)

            updatedLetters[index].Status = `KeyBoard${colorLetters[guessedIndex]}`
            this.setState({
                letters: updatedLetters
            })
        });
    
    };

    render () {
        const letters1 = this.state.letters.slice(0, 10)
        const letters2 = this.state.letters.slice(10, 19)
        const letters3 = this.state.letters.slice(19, 27)



        return (
            <div className='keyboardContainer'>
                <div className='keysRow'>
                    {letters1.map( letter => {
                        return <button className={letter.Status} key={letter.Letter} onClick={() => this.letterClicked(letter.Letter)}>{letter.Letter}</button>
                    })}
                </div>
                <div className='keysRow'>
                    {letters2.map( letter => {
                        return <button className={letter.Status} key={letter.Letter} onClick={() => this.letterClicked(letter.Letter)}>{letter.Letter}</button>
                    })}
                </div>
                <div className='keysRow'>
                    <button className='Enter' onClick={this.updateKeyboard}> ENTER </button>
                    {letters3.map( letter => {
                        return <button className={letter.Status} key={letter.Letter} onClick={() => this.letterClicked(letter.Letter)}>{letter.Letter}</button>
                    })}
                    <button className='Backspace' onClick={this.props.removeLetter} > <BsBackspace/> </button>
                </div>
            </div>
        
        )
    } 
};


export default gameKeyboard;