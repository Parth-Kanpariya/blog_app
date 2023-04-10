import React from 'react';
import './customInput.css';

function CustomInput({ label, field, form: { touched, errors }, ...props }) {
  const isError = touched[field.name] && errors[field.name];
  return (
    <>
      <label>{label}</label>
      <input
        className={`text-input ${isError ? 'error' : ''}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      {isError && <div className="error">{isError}</div>}
    </>
  );
}

export const CustomSearchInput = ({ label, ...props }) => {
  return (
    <>
      <label>{label}</label>
      <input className={`text-input}`} {...props} autoComplete="off" />
    </>
  );
};

export const CustomTextArea = ({ label, field, form: { touched, errors }, ...props }) => {
  const isError = touched[field.name] && errors[field.name];
  return (
    <>
      <label>{label}</label>

      <textarea
        className={`text-input ${isError ? 'error' : ''}}`}
        {...field}
        {...props}
        autoComplete="off"
        rows="5"
        cols="35"
      />
      {isError && <div className="error">{isError}</div>}
    </>
  );
};

export default CustomInput;
