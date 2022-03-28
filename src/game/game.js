import React, {Component} from 'react'
import GameKeyboard from '../gameKeyboard/gameKeyboard'
import GameBoard from '../gameBoard/gameBoard'
import classes from './game.module.css'
import {Link} from 'react-router-dom'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {BsFillShareFill} from 'react-icons/bs'
import CryptoJS from 'crypto-js'
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
        endGame: false
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
        if (!this.state.endGame) {
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

        // if (goldenDoubleLetter) {
        //     find = (goldenDoubleLetter, goldenWord) => {
        //         const indexes = [],
        //         const index = goldenWord.indexOf(goldenDoubleLetter);
        //         while (index != -1) {
        //             indexes.push(index)
        //             index = goldenWord.indexOf(goldenDoubleLetter, index + 1)
        //         }
        //         return indexes
        //     }
        // }

        // console.log( find(goldenDoubleLetter, goldenWord) )

        if (wordle === goldenWordle) {
            this.setState({
                endGameModal: true,
                endGame: true
            })
        }

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