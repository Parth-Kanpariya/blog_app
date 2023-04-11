import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput, { CustomTextArea } from '../component/CustomInput';
import { createBlogService, getBlogByIdService, updateBlogService } from '../services/blogService';
import { ToastContainer } from 'react-toastify';
import { successToast, errorToast } from '../helper/ToastComponent';
import { useNavigate, useLocation } from 'react-router-dom';
const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  image: Yup.mixed().required('Required')
});
function EditBlog() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blogID = queryParams.get('q');
  const [blogData, setBlogData] = useState(null);
  useEffect(() => {
    const fetchBlogList = async () => {
      const BlogData = await getBlogByIdService(blogID);
      setBlogData(BlogData.data.data.data[0]);
      //   setUser(BlogData.data.data.data[0].user[0]);
    };
    fetchBlogList();
  }, []);

  async function handleSubmit(values, { resetForm, setSubmitting, setFieldValue }) {
    console.log('===========');

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('image', values.image);

    console.log(values);

    resetForm();

    try {
      const resp = await updateBlogService(blogID, formData);
      if (resp.status === 200) {
        successToast('Blog published Successfully');
        navigate(`/blog/${blogID}`);
        return;
      }
      errorToast('Blog is not Published!');
    } catch (error) {
      errorToast('Error while Publishing blog');
    }
  }
  if (!blogData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Formik
        initialValues={{
          title: blogData.title,
          description: blogData.description,
          category: blogData.category,
          image: null
        }}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
      >
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

export default EditBlog;
