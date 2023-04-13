/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import './roundImage.css'; // import your stylesheet

function RoundImage(props) {
  return (
    <div style={props.style} className="container">
      <img className="round-image" src={props.img} alt="round image" />
    </div>
  );
}

export default RoundImage;
