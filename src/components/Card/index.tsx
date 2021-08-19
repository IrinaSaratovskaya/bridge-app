import React from 'react';

interface Props {
    card: {
        image: string
    };
    handleCardClick: () => void;
    selected: boolean;
}

const Card: React.FC<Props> = ({ card = {}, handleCardClick, selected }) => {

    const image = card.image;
    return (
        <div className={`card mt-4 mb-4 w-75 ${selected ? 'selected' : ''}`} onClick={handleCardClick}>
            <div className="card-body">
                <div className="card-back">
                    <img src={"/img/card_back_side.jpg"} alt="card back side" />
                </div>
                <div className="card-front">
                    <img src={image} alt="card front side" />
                </div>
            </div>
        </div>
    );
}

export default Card;