import React, {Component} from 'react'
import GameKeyboard from '../gameKeyboard/gameKeyboard'
import GameBoard from '../gameBoard/gameBoard'
import classes from './game.module.css'

class Game extends Component {
    state = {
        words: [],
        postion: 0,
        row1: ['', '', '', '', ''],
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
            let row = [...this.state.row1]
            row[this.state.postion] = letter
            this.setState({
               row1: row
            })
        }
        
    }

    removeLetterHandler = () => {
        let row = [...this.state.row1]
        row[this.state.postion - 1] = ''
        this.setState({
            row1: row,
            postion: this.state.postion -1
        })

        if (this.state.postion > 0) {
            this.setState({
                postion: this.state.postion - 1 
            })
        }
    }

    enterWordHandler = () => {
        const word = this.state.row1.join('')
        console.log(word)
        const words = [...this.state.words, word]
        this.setState({
            words: words
        })
    }



    render() {
        return (
            <div className={classes.Game}>
                mordle
                <button onClick={() => {
                    console.log(this.state)
                }}>click</button>
                {this.state.words}
                <GameBoard 
                    row1={this.state.row1}
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