import React from 'react';
import { Form, Formik, Field } from 'formik';
import CustomInput from '../component/CustomInput';
import { registerSchema } from '../pages/registerInputSchema';
import Button from '../component/Button';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { RegisterUser } from '../services/authService';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../helper/ToastComponent';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    console.log(values);
    const response = await RegisterUser(values);
    if (response === null) {
      errorToast('User alredy exist with same Email');
    } else {
      successToast('User registered successfully!');
      actions.resetForm();
      navigate('/login');
    }
  };
  if (localStorage.token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
      <Formik
        initialValues={{
          firstname: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}>
        {({ errors, touched }) => (
          <Form>
            <Field
              name="firstname"
              label="FirstName"
              type="text"
              component={CustomInput}
              errors={errors}
              touched={touched}
            />
            <Field
              name="email"
              label="Email"
              type="email"
              component={CustomInput}
              errors={errors}
              touched={touched}
            />
            <Field
              name="password"
              label="Password"
              component={CustomInput}
              errors={errors}
              touched={touched}
              type="password"
            />
            <Field
              name="confirmPassword"
              label="Confirm Password"
              component={CustomInput}
              errors={errors}
              touched={touched}
              type="password"
            />
            <Button style={{ marginTop: '20px' }} type="submit" text="Sign up" />
          </Form>
        )}
      </Formik>
      <p>
        If you already have a registration <Link to="/login">login here</Link>
      </p>
      <ToastContainer />
    </>
  );
}

export default Register;
