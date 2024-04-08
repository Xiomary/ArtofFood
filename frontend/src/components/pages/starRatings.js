import React from 'react';
import ReactStars from "react-rating-stars-component";

const StarRating = ({ newRating, disabled }) => {
    return (
        <ReactStars
            count={5}
            onChange={newRating}
            size={20}
            activeColor="#ffd700"
            edit={!disabled} // Control interactivity based on the disabled prop
        />
    );
};

export default StarRating;
