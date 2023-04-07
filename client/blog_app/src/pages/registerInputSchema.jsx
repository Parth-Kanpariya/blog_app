import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const registerSchema = yup.object().shape({
  firstname: yup.string().required('firstname Required'),
  // lastname: yup.string().required("lastname Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('password Required'),
  confirmPassword: yup
    .string()
    .required('confirm password Required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  email: yup.string().email('Please enter a valid email').required('Email Required')
  // country: yup.string().max(12).required("country name required"),
  // username: yup
  //   .string()
  //   .min(6, 'Username must be at least 6 characters long')
  //   .max(12, 'Must be 12 characters or less')
  //   .required('username Required'),
  // age: yup.number().positive().integer().required('Age Required'),
  // gender: yup.string().oneOf(['male', 'female'], 'Invalid gender Type').required('gender Required')
});

export const loginInputSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('password Required'),
  email: yup.string().email('Please enter a valid email').required('Email Required')
  // username: yup
  //   .string()
  //   .min(6, 'Username must be at least 6 characters long')
  //   .max(12, 'Must be 12 characters or less')
  //   .required('username Required'),
  // age: yup.number().positive().integer().required('Age Required'),
  // gender: yup.string().oneOf(['male', 'female'], 'Invalid gender Type').required('gender Required')
});
