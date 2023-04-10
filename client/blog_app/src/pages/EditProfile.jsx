import React, { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import CustomInput from '../component/CustomInput';
import { registerSchema } from '../pages/registerInputSchema';
import Button from '../component/Button';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { RegisterUser, getUser, updateUser } from '../services/authService';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../helper/ToastComponent';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {
  const navigate = useNavigate();
  const { firstname, email, image } = JSON.parse(localStorage.user);

  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('firstname', values.firstname);
    formData.append('profile_image', values.profile_image);

    console.log(values);
    // actions.resetForm();

    try {
      const resp = await updateUser(formData);
      if (resp.status === 201) {
        successToast('User updated Successfully');
        return;
      }
      errorToast('User is not updated!');
    } catch (error) {
      errorToast('Error while updating User');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Edit Profile</h1>
      <Formik
        initialValues={{
          firstname: firstname,
          profile_image: image
        }}
        onSubmit={onSubmit}
        // validationSchema={registerSchema}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Field
              name="firstname"
              label="FirstName"
              type="text"
              component={CustomInput}
              errors={errors}
              touched={touched}
            />
            <label htmlFor="image">Image:</label>
            <input
              id="profileImage"
              name="profile_image"
              type="file"
              onChange={(event) => {
                setFieldValue('profile_image', event.currentTarget.files[0]);
              }}
            />
            <Button style={{ marginTop: '20px' }} type="submit" text="Update" />
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default EditProfile;
