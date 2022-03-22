import React, {useState} from 'react'
import classes from './createWordle.module.css'

const CreateWorlde = (props) => {

    const [next, setNext] = useState(false)
    const [word, setWord] = useState('')
    const [name, setName] = useState('')
    const [copied, setCopied] = useState(false)
    const [btnText, setBtnText] = useState('Next')

    const checkWordHandler = () => {
        const inWordList = props.words.includes(`${word.toLowerCase()}`)
        if (inWordList) {
            setNext(true)
            setBtnText('Create Link')
        } else {
            alert('Not in word list')
        }

    }

    const setWordHandler = (e) => {
        setWord(e.target.value)
    }

    const setNameHandler = (e) => {
        setName(e.target.value)
    }

    const createLink = () => {
        const Link = `https://wordlewithfriend.web.app/game/${name}/${word.toUpperCase()}`
        navigator.clipboard.writeText(Link);
        setCopied(true)
        setBtnText('Link Copied!')
    }

    return (
        <div className={classes.CreateWordle}>
            <div className={classes.Header}>
                <h2 className={classes.Logo}>Wordle</h2>
            </div>
            <h1 className={classes.Welcome}>Welcome to Mordle 👋 </h1>
            <p className={classes.Sub}>Chose your own word and let your friends try guess it.</p>
            <div className={classes.InputContainer}>
                <p className={classes.Label}>Your Word</p>
                <input type='text' className={classes.Input} onChange={setWordHandler}/>
                {next ? (
                    <div>
                        <p className={classes.Label}>Your Name</p>
                        <input type='text' className={classes.Input} onChange={setNameHandler}/>
                    </div>
                ) : null}
                <button 
                    className={copied ? classes.Copied : classes.Button}
                    onClick={next ? createLink : checkWordHandler}
                    type='submit'
                >
                    {btnText}
                </button>
            </div>
        </div>
    )
}


export default CreateWorlde;