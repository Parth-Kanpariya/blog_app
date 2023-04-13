import React from 'react';
import { Form, Formik, Field } from 'formik';
import CustomInput from '../component/CustomInput';
import Button from '../component/Button';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/authService';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../helper/ToastComponent';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser as updateUSerAction } from '../redux/actions';

function EditProfile() {
  const navigate = useNavigate();
  const userPayload = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('firstname', values.firstname);
    formData.append('profile_image', values.profile_image);

    try {
      const resp = await updateUser(formData);
      if (resp) {
        successToast('User updated Successfully');
        dispatch(updateUSerAction(resp.data.data));
        navigate('/profile');
        return;
      }
      errorToast('User is not updated!');
    } catch (error) {
      errorToast('Error while updating User');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}> Edit Profile </h1>
      <Formik
        initialValues={{
          firstname: userPayload.user?.firstname,
          profile_image: null
        }}
        onSubmit={onSubmit}>
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
            <label htmlFor="image"> Image: </label>
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
