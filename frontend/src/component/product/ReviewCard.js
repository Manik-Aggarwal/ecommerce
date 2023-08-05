import React from 'react';
import { Rating } from "@material-ui/lab";
import profilePng from '../../images/Profile.png';
import "./ProductDetails.css";

const ReviewCard = ({review}) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  
  return (
    <div className='reviewCard m-3 bg-indigo-50 rounded-2xl flex-none flex flex-col items-center w-2/3 md:w-2/5 sm:w-3/5'>
        <img className='w-1/4 mt-2' src={profilePng} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className='mb-4 reviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard