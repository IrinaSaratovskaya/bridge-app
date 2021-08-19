import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { useStore } from '../../zustand/useStore';
import Card from '../../components/Card';

type Dictionary = {
    [key: string]: number
}

const dict: Dictionary = {  
    "2": 2, 
    "3": 3, 
    "4": 4, 
    "5": 5, 
    "6": 6, 
    "7": 7, 
    "8": 8, 
    "9": 9, 
    "10": 10, 
    "JACK": 11, 
    "QUEEN": 12, 
    "KING": 13, 
    "ACE": 14,  
}

const HomePage: React.FC<RouteComponentProps> = ({history}) => {

    const loggedIn = useStore(state => state.loggedIn);
    const betSize = 10;
    const [balance, setBalance] = useState(1000);
    const [play, setPlay] = useState(false);
    const [startGame, setStartGame] = useState(true);
    const [deckId, setDeckId] = useState();
    const [cards, setCards] = useState([]);
    const [selected, setSelected] = useState(false);
    const [result, setResult] = useState('');
    
    useEffect(() => {
        if (!loggedIn) {
            history.push('/login');
        } else {
            initDeck();
        }
    }, [])
    
    const startPlay = () => {
        setPlay(true);
        setBalance(balance - betSize);
        drawCard();
    }

    const restartGame = () => {
        setPlay(true);
        setBalance(balance - betSize);
        drawCard();
        setSelected(false);
        setResult('');
    }

    const initDeck = async () => {
        const { data } = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        setDeckId(data.deck_id);
    }

    const drawCard = async () => {
        const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
        if (!data.remaining) {
            initDeck();
        }
        setCards(data.cards);
    }

    const handleCardClick = (index: number) => {
        if (!result && cards[0]) {
            setSelected(true);
            setPlay(false);
            setStartGame(false);
    
            let userCard;
            let otherCard;
    
            if (index === 0) {
                userCard = cards[0]['value'];
                otherCard = cards[1]['value'];
            } else {
                userCard = cards[1]['value'];
                otherCard = cards[0]['value'];
            }
    
            if (dict[userCard] > dict[otherCard]) {
                setResult('won');
                setBalance(balance + betSize * 2);
            } else if (dict[userCard] === dict[otherCard]) {
                setResult('equal')
                setBalance(balance + betSize);
            } else {
                setResult('lost')
            }
        }
    }
    
    return (
        <div>
            <h6 className="balance pb-3">Balance: {balance} USD</h6>
            <div className="container main-container">
                {!result && (
                    <div className="title p-3 pb-md-4 mx-auto text-center">
                        <h1 className="subtitle display-6 fw-normal">Кто выиграет?</h1>
                        <p className="fs-5 text-muted">Сыграй в игру и испытай удачу</p>
                    </div>
                )}
                {result === 'won' && (
                    <div className="title p-3 pb-md-4 mx-auto text-center">
                        <h1 className="subtitle display-6 fw-normal">Вы выиграли $20!</h1>
                        <p className="fs-5 text-muted">;)</p>
                    </div>
                )}
                {result === 'lost' && (
                    <div className="title p-3 pb-md-4 mx-auto text-center">
                        <h1 className="subtitle display-6 fw-normal">Вы проиграли...</h1>
                        <p className="fs-5 text-muted">:(</p>
                    </div>
                )}
                {result === 'equal' && (
                    <div className="title p-3 pb-md-4 mx-auto text-center">
                        <h1 className="subtitle display-6 fw-normal">Ничья!</h1>
                        <p className="fs-5 text-muted">:)</p>
                    </div>
                )}
                <div className="row mb-3 text-center">
                    <div className="col-4 d-flex justify-content-center">
                        <Card 
                            card={cards[0]}
                            handleCardClick={() => handleCardClick(0)}
                            selected={selected}
                        />
                    </div>
                    {play ? (
                        <div className="col-4 d-flex align-items-center justify-content-between">
                            <button type="button" className="btn btn-primary" onClick={() => handleCardClick(0)}>Слева</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleCardClick(1)}>Справа</button>
                        </div>
                    ) : (
                        <div className="col-4 d-flex align-items-center justify-content-center">
                            {startGame ? (
                                <button type="button" className="btn btn-primary" onClick={startPlay}>Играть</button>
                            ) : (
                                <button type="button" className="btn btn-primary" onClick={restartGame}>Сыграть еще</button>
                            )}
                        </div>
                    )}
                    <div className="col-4 d-flex justify-content-center">
                        <Card 
                            card={cards[1]}
                            handleCardClick={() => handleCardClick(1)}
                            selected={selected}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(HomePage);