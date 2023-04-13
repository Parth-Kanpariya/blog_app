import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
export default function Icon({
  icon,
  onClick,
  name,
  id,
  fixedWidth,
  size,
  color,
  border,
  inverse,
  style
}) {
  const handleOnClick = (e, icon) => {
    onClick(
      e,
      e.target.parentNode.hasAttribute('mytype')
        ? e.target.parentNode.getAttribute('id')
        : e.target.getAttribute('id'),
      name
    );
  };
  return (
    <FontAwesomeIcon
      icon={icons[icon]}
      onClick={handleOnClick}
      id={id}
      style={style}
      mytype="my-type"
      name={name}
      size={size}
      border={border}
      color={color}
      fixedWidth={fixedWidth}
      inverse={inverse}
    />
  );
}
