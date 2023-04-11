import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

import { getBlogService } from '../services/blogService';

function BlogList({ id, query }) {
  const [Blogs, setBlogs] = useState([]);
  const user_id = localStorage.userId;
  useEffect(() => {
    const fetchBlogList = async () => {
      const BlogList = await getBlogService(id);
      setBlogs(BlogList.data.data.data);
      console.log(BlogList.data.data.data);
    };
    fetchBlogList();
  }, []);

  const filteredBlog = Blogs.filter((blog) => {
    return blog.title.toLowerCase().includes(query?.toLowerCase() || '');
  });
  return (
    <div>
      {id === undefined
        ? filteredBlog?.map((blog) => <BlogCard key={blog.blog_id} blog={blog} />)
        : filteredBlog?.map((blog) => {
            if (blog.user_id === user_id) {
              return <BlogCard key={blog.blog_id} blog={blog} />;
            }
          })}{' '}
    </div>
  );
}

export default BlogList;
