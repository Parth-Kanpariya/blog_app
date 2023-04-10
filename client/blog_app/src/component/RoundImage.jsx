import React from 'react';
import './roundImage.css'; // import your stylesheet

function RoundImage({ img }) {
  console.log(img);
  return (
    <div className="container">
      <img className="round-image" src={img} alt="round image" />
    </div>
  );
}

export default RoundImage;
