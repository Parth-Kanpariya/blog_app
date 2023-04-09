import React from 'react';
import './roundImage.css'; // import your stylesheet

function RoundImage() {
  return (
    <div className="container">
      <img
        className="round-image"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
        alt="round image"
      />
    </div>
  );
}

export default RoundImage;
