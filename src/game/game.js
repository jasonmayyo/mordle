import React, {Component} from 'react'
import GameKeyboard from '../gameKeyboard/gameKeyboard'
import GameBoard from '../gameBoard/gameBoard'
import classes from './game.module.css'

import CryptoJS from 'crypto-js'


class Game extends Component {
    state = {
        goldenWord: [],
        postion: 0,
        activeRow: 0,
        rows: [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ],
        rowsReveal: [
            ['D', 'D', 'D', 'D', 'D'],
            ['D', 'D', 'D', 'D', 'D'],
            ['D', 'D', 'D', 'D', 'D'],
            ['D', 'D', 'D', 'D', 'D'],
            ['D', 'D', 'D', 'D', 'D'],
            ['D', 'D', 'D', 'D', 'D'],
        ],
        name: ''
    }

    componentDidMount = () => {
        const encrypted = this.props.word;
        const decrypted = CryptoJS.DES.decrypt(encrypted, "Jason8104");
        const string = decrypted.toString(CryptoJS.enc.Utf8)
        const goldenWord = string.split('')
        this.setState({
            name: this.props.name,
            goldenWord: goldenWord
        })
        console.log(goldenWord)
    }



    changePositionHandler = () => {
        if (this.state.postion < 5) {
            this.setState({
                postion: this.state.postion + 1
            })
        } 
    }
    
    setLetterHandler = (letter) => {
        this.changePositionHandler()
        if (this.state.postion < 5) {
            let rows = [...this.state.rows]
            let row = [...this.state.rows[this.state.activeRow]]
            row[this.state.postion] = letter
            rows[this.state.activeRow] = row
            this.setState({
               rows: rows
            })
        }
        
    }

    removeLetterHandler = () => {
        let rows = [...this.state.rows]
        let row = [...this.state.rows[this.state.activeRow]]
        row[this.state.postion - 1] = ''
        rows[this.state.activeRow] = row
        this.setState({
            rows: rows,
            postion: this.state.postion -1
        })

        if (this.state.postion > 0) {
            this.setState({
                postion: this.state.postion - 1 
            })
        }
    }

    enterWordHandler = () => {
        const word = this.state.rows[this.state.activeRow].join('').toLowerCase()
        const goldenWord = this.state.goldenWord.join('').toLowerCase()
        const inWordList = this.props.words.includes(`${word}`)

        if (this.state.postion === 5) {
            if (inWordList) {
                this.setState({
                    activeRow: this.state.activeRow + 1,
                    postion: 0,
                    word: word
                })
                this.checkLetterPositionHandler()
            } else {
                alert('Not in word list')
            }
        }
        
    }

    checkLetterPositionHandler = () => {
        const word = this.state.rows[this.state.activeRow]
        const goldenWord = this.state.goldenWord
        //const doubleLetter = word.filter( (letter , index) => word.indexOf(`${letter}`) !== index)
        //const goldenDoubleLetter = goldenWord.filter( (letter, index) => goldenWord.indexOf(`${letter}`) !== index)

        const rowsReveal = this.state.rowsReveal
        const rowReveal = rowsReveal[this.state.activeRow]
        word.forEach( (letter, index) => {
            const inWord = goldenWord.includes(`${letter}`)
            if (inWord) {
                if (letter === goldenWord[index]) {
                    //Green
                    rowReveal[index] = 'Green'
                    this.setState({
                        rowsReveal: rowsReveal
                    })
                } else {
                    //Orange
                    rowReveal[index] = 'Orange'
                    this.setState({
                        rowsReveal: rowsReveal
                    })
                }
            } else {
                //Grey
                rowReveal[index] = 'Grey'
                this.setState({
                    rowsReveal: rowsReveal
                })
            }
         })
    }

    render() {
        return (
            <div className={classes.Game}>
                <div className={classes.Header}>
                    <h2 className={classes.Logo}>{this.state.name}'s Wordle</h2>
                </div>
                <GameBoard 
                    rows={this.state.rows}
                    rowsReveal={this.state.rowsReveal}
                />
                <GameKeyboard 
                    setLetter={this.setLetterHandler}
                    removeLetter={this.removeLetterHandler}
                    enterWord={this.enterWordHandler}
                />
            </div>
        );
    }  
}


export default Game;