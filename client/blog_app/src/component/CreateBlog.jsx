import React from 'react';
import { Button } from 'reactstrap';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput, { CustomTextArea } from './CustomInput';
import { createBlogService } from '../services/blogService';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../helper/ToastComponent';
const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  image: Yup.mixed().required('Required')
});
function CreateBlog() {
  async function handleSubmit(values, { setSubmitting }) {
    console.log('===========');

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('image', values.image);

    console.log(values);
    // actions.resetForm();

    try {
      const resp = await createBlogService(formData);
      if (resp.status === 201) {
        successToast('Blog published Successfully');
        return;
      }
      errorToast('Blog is not created!');
    } catch (error) {
      errorToast('Error while creating blog');
    }
    // setSubmitting(false);
    // axios
    //   .post('/api/posts', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setSubmitting(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setSubmitting(false);
    //   });
  }
  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          description: '',
          category: '',
          image: null
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <label htmlFor="title">Title:</label>
            <Field type="text" name="title" id="title" component={CustomInput} />

            <label htmlFor="description">Body:</label>
            <Field as="textarea" name="description" id="description" component={CustomTextArea} />

            <label htmlFor="category">Category:</label>
            <Field as="select" name="category" id="category">
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="productivity">Productivity</option>
              <option value="networking">Networking</option>
              <option value="career development">Career development</option>
              <option value="communication">Communication</option>
              <option value="relationship">Relationship</option>
              <option value="leadership">Leadership</option>
            </Field>

            <label htmlFor="image">Image:</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                setFieldValue('image', event.currentTarget.files[0]);
              }}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default CreateBlog;
