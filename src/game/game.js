import React, {Component} from 'react'
import GameKeyboard from '../gameKeyboard/gameKeyboard'
import GameBoard from '../gameBoard/gameBoard'
import classes from './game.module.css'
import {Link} from 'react-router-dom'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {BsConeStriped, BsFillShareFill} from 'react-icons/bs'
import CryptoJS, { enc } from 'crypto-js'
import Aux from '../hoc/Aux'


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
        name: '',
        endGameModal: false,
        shared: false,
        endGame: false,
        url: ''
    }


    componentDidMount = () => {
        window.addEventListener('keydown', this.setKeyBoardLetter)

        const updatedRow = sessionStorage.getItem('rows')
        const rows = JSON.parse(updatedRow)

        const updatedRowsReveal = sessionStorage.getItem('rowsReveal')
        const rowsReveal = JSON.parse(updatedRowsReveal)

        const activeRowString = sessionStorage.getItem('activeRow')
        const activeRow = JSON.parse(activeRowString)

        if (rows !== null && rowsReveal !== null) {
            this.setState({
                rows: rows,
                rowsReveal: rowsReveal,
                activeRow: activeRow
            })
        }


        const encrypted = this.props.word;
        const decrypted = CryptoJS.DES.decrypt(encrypted, "Jason8104");
        const string = decrypted.toString(CryptoJS.enc.Utf8)
        const goldenWord = string.split('')
        this.setState({
            name: this.props.name,
            goldenWord: goldenWord,
            url: encrypted
        })
    }



    changePositionHandler = () => {
        if (this.state.postion < 5) {
            this.setState({
                postion: this.state.postion + 1
            })
        } 
    }

    setKeyBoardLetter = (event) => {
        let Letter = event.key.toUpperCase()
        this.setLetterHandler(Letter)
    }

    
    setLetterHandler = (letter) => {
        if (letter === 'ENTER') {
            this.enterWordHandler()
        } else if (letter === 'BACKSPACE') {
            this.removeLetterHandler()
        } else if (!this.state.endGame && this.state.postion < 5) {
            let rows = [...this.state.rows]
            let row = [...this.state.rows[this.state.activeRow]]
            row[this.state.postion] = letter
            rows[this.state.activeRow] = row
            this.setState({
                rows: rows,
            })
            this.changePositionHandler()
        }
        
    }

    removeLetterHandler = () => {
        let rows = [...this.state.rows]
        let row = [...this.state.rows[this.state.activeRow]]
        row[this.state.postion - 1] = ''
        rows[this.state.activeRow] = row
        this.setState({
            rows: rows,
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
                this.checkLetterPositionHandler()
                this.setState({
                    postion: 0,
                    word: word,
                    activeRow: this.state.activeRow + 1,
                })
                sessionStorage.setItem('activeRow', this.state.activeRow )
            } else {
                alert('Not in word list')
            }
        }

        if (this.state.activeRow >= 5) {
            this.setState({
                endGameModal: true
            })
        }
    }

    checkLetterPositionHandler = () => {
        const word = this.state.rows[this.state.activeRow]
        const goldenWord = this.state.goldenWord
        const doubleLetter = word.filter( (letter , index) => word.indexOf(`${letter}`) !== index)
        const goldenDoubleLetter = goldenWord.filter( (letter, index) => goldenWord.indexOf(`${letter}`) !== index)
        const wordle = this.state.rows[this.state.activeRow].join('').toLowerCase()
        const goldenWordle = this.state.goldenWord.join('').toLowerCase();


        if (wordle === goldenWordle) {
            this.setState({
                endGameModal: true,
                endGame: true
            })
        }

        //Green
        // rowReveal[index] = 'Green'
        // this.setState({
        //     rowsReveal: rowsReveal
        // })

        var results = [];
        var idx = word.indexOf(doubleLetter[0]);
        while (idx !== -1) {
            results.push(idx);
            idx = word.indexOf(doubleLetter[0], idx + 1);
        }

        console.log(results)

        const rowsReveal = this.state.rowsReveal
        const rowReveal = rowsReveal[this.state.activeRow]

        for (let i = 0; i < 5; i++ ) {
            if (word[i] === goldenWord[i]) {
                //Green
                rowReveal[i] = 'Green'
                this.setState({
                    rowsReveal: rowsReveal
                })
            } else if (goldenWord.includes(word[i]) && goldenWord.includes(doubleLetter[0]) && doubleLetter.length > 0) {
                const indexOrange = results[0]
                const indexGrey = results[1]
                //Orange
                rowReveal[indexOrange] = 'Orange'
                rowReveal[indexGrey] = 'Grey'
                this.setState({
                    rowsReveal: rowsReveal
                })
            } else if (goldenWord.includes(word[i])) {
                //Orange
                rowReveal[i] = 'Orange'
                this.setState({
                    rowsReveal: rowsReveal
                })
            } else if (!goldenWord.includes(word[i])) {
                //Grey
                rowReveal[i] = 'Grey'
                this.setState({
                    rowsReveal: rowsReveal
                })
            } 
        }

        sessionStorage.setItem('rows', JSON.stringify(this.state.rows))
        sessionStorage.setItem('rowsReveal', JSON.stringify(this.state.rowsReveal))
    }

    share = () => {
        const newRows = [...this.state.rowsReveal]

        newRows.forEach(row => {
            row.forEach( (color, index) => {
                if (color === 'Green') {
                    row[index] = '🟩'
                } else if (color === 'Orange') {
                    row[index] = '🟨'
                } else if (color === 'Grey') {
                    row[index] = '⬛'
                } else {
                    row[index] = '‏‏‎'
                }
            })
        });


        const shared = `${this.state.name}'s word was ${this.state.goldenWord.join('')}

        ${newRows[0].join('')}
        ${newRows[1].join('')}
        ${newRows[2].join('')}
        ${newRows[3].join('')}
        ${newRows[4].join('')}
        ${newRows[5].join('')}

        `
        navigator.clipboard.writeText(shared);
        this.setState({
            shared: true
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
                    guessedWord={this.state.rows[this.state.activeRow]}
                    wordColors={this.state.rowsReveal[this.state.activeRow]}
                />
                {this.state.endGameModal ? 
                    <Aux>
                        <div className={classes.EndGameModal}>
                            <AiOutlineCloseCircle className={classes.Close} onClick={() => this.setState({endGameModal: false})}/>
                            <p className={classes.EndGameText}>{this.state.name}'s word was</p>
                            <h1 className={classes.Word}>{this.state.goldenWord.join('')}</h1>
                            <Link className={classes.Button} to="/">Create a word</Link>
                            <button className={classes.ShareButton} onClick={this.share}>Share <BsFillShareFill style={{paddingLeft: '10px'}}/></button>
                        </div>
                        {this.state.shared ? 
                            <div className={classes.Copied}>
                                Results copied to clipboard 🟩 
                            </div>
                        : null}
                    </Aux>
                : null}
            </div>
        );
    }  
}


export default Game;