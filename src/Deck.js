import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from './Card';
import './Deck.css'

const Deck = () => {

    const getRanNum = () => Math.floor(Math.random()*91);
    const [deck, setDeck] = useState('')
    const [emptyDeck, setEmptyDeck] = useState(false)
    const [cards, setCards] = useState([]);
    useEffect(() => {
        async function loadDeck () {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
            setDeck(res.data.deck_id);
        } 
        loadDeck();
        return () => setCards([])
    }, [emptyDeck])

    async function drawCard () {
        try {
            if(cards.length === 52) {
                setEmptyDeck(!emptyDeck)
                throw new Error('Deck empty! Re-shuffle deck?')
            }
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/`);
            setCards(cards => [...cards, {key: `${res.data.cards[0].value}-${res.data.cards[0].suit}`, url: res.data.cards[0].image, rotation: getRanNum()}]);
        } catch(err) {
            alert(err)
        }
        
    } 


    return (
        <div>
            {deck ? <h1>Pick a card!</h1> : <h1>Loading new deck...</h1>}
            {cards.map((card) => {
                if (cards.indexOf(card) === cards.length - 1) {
                    return <Card key={card.key} cardImg={card.url} rotation={card.rotation} position={'relative'} />
                } else {
                    return <Card key={card.key} cardImg={card.url} rotation={card.rotation} position={'absolute'} />
                }
                }
            )}
            <h3>Remaining Cards: {52 - cards.length}</h3>
            <button className="cards-btn" onClick={drawCard}>Draw Card</button>
        </div>
    )
}

export default Deck;