import React from 'react';
import ReactStars from "react-rating-stars-component";

const StarRating = ({ onRating }) => {
    return (
        <ReactStars
            count={5}
            onChange={onRating}
            size={24}
            activeColor="#ffd700"
        />
    );
};

export default StarRating;
