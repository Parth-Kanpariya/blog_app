import React from 'react';
import './customInput.css';

function Button({ text, ...props }) {
  return <button {...props}>{text}</button>;
}

export default Button;
