import React from 'react';
import { Form, Formik, Field } from 'formik';
import CustomInput from '../component/CustomInput';
import { loginInputSchema } from '../pages/registerInputSchema';
import Button from '../component/Button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../services/authService';
import { successToast, errorToast } from '../helper/ToastComponent';

function Login() {
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const response = await loginUser(values);
    if (response === null) {
      errorToast('Invalid email or password');
      return;
    }
    successToast('User LoggedIn successfully!');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
    navigate('/', { replace: true });
  };

  if (localStorage.token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Sign In</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={onSubmit}
        validationSchema={loginInputSchema}>
        {({ errors, touched }) => (
          <Form>
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
            <Button style={{ marginTop: '20px' }} type="submit" text="Sign In" />
          </Form>
        )}
      </Formik>
      <p>
        If you do not have a registration with us yet <Link to="/register">register</Link>
      </p>
      <ToastContainer />
    </>
  );
}

export default Login;
