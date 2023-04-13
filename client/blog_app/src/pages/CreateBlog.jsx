import React from 'react';
import { Button } from 'reactstrap';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomInput, { CustomTextArea } from '../component/CustomInput';
import { createBlogService } from '../services/blogService';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../helper/ToastComponent';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object({
  title: Yup.string().required('Please add Title'),
  description: Yup.string().required('Please Enter Description'),
  category: Yup.string().required('Please select Category'),
  image: Yup.mixed().required('Please select Image'),
  tags: Yup.string().required('Please Enter tags')
});
function CreateBlog() {
  const navigate = useNavigate();
  async function handleSubmit(values, { resetForm, setSubmitting, setFieldValue }) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('image', values.image);
    formData.append('tags', values.tags);

    resetForm();

    try {
      const resp = await createBlogService(formData);
      if (resp.status === 201) {
        successToast('Blog published Successfully');
        console.log(resp);
        navigate(`/blog/${resp.data.data.newblog.blog_id}`);
        return;
      }
      errorToast('Blog is not created!');
    } catch (error) {
      errorToast('Error while creating blog');
    }
  }
  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          description: '',
          category: '',
          image: null,
          tags: ''
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
              <option value="Organic Farming">Organic Farming</option>
              <option value="health">Health</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="productivity">Productivity</option>
              <option value="networking">Networking</option>
              <option value="career development">Career development</option>
              <option value="communication">Communication</option>
              <option value="relationship">Relationship</option>
              <option value="leadership">Leadership</option>
            </Field>
            <ErrorMessage name="category" component="div" style={{ color: 'black' }} />

            <label htmlFor="image">Image:</label>
            <input
              id="image"
              name="image"
              type="file"
              onChange={(event) => {
                setFieldValue('image', event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="image" component="div" style={{ color: 'black' }} />

            <Field type="text" label="tags" name="tags" id="tags" component={CustomInput} />

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
