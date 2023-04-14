import React from 'react';
import { Form, Formik, Field } from 'formik';
import CustomInput from '../component/CustomInput';
// import { registerSchema } from '../pages/registerInputSchema';
import Button from '../component/Button';
import { useNavigate, Navigate } from 'react-router-dom';
import { VerifyUserService } from '../services/authService';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../helper/ToastComponent';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
const validationSchema = Yup.object({
  otp: Yup.string().required(),
  email: Yup.string().required()
});
function VerifyUser() {
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    const response = await VerifyUserService(values);
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
      <h1 style={{ textAlign: 'center' }}>User Verification</h1>
      <Formik
        initialValues={{
          otp: '',
          email: ''
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ errors, touched }) => (
          <Form>
            <Field
              name="email"
              label="Email"
              type="text"
              component={CustomInput}
              errors={errors}
              touched={touched}
            />
            <Field
              name="otp"
              label="OTP"
              type="text"
              component={CustomInput}
              errors={errors}
              touched={touched}
            />
            <Button style={{ marginTop: '20px' }} type="submit" text="Verify User" />
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}

export default VerifyUser;
