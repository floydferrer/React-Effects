import React from "react";
import './Card.css'

const Card = ({ cardImg, rotation, position}) => {
    return (
        <img
            className="card"
            src={cardImg}
            style={{
                position: position,
                transform: `rotate(${rotation-45}deg)`
            }}
        >
        </img>
    )
}

export default Card;