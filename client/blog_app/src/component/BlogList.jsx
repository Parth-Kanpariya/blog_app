import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

import { getBlogService } from '../services/blogService';

function BlogList({id}) {
  const [Blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogList = async () => {

      const BlogList = await getBlogService(id);
      setBlogs(BlogList.data.data.data);
      console.log(BlogList.data.data.data);
    };
    fetchBlogList();
  }, []);

  return (
    <div>
      {' '}
      {Blogs?.map((blog) => (
        <BlogCard key={blog.blog_id} blog={blog} />
      ))}{' '}
    </div>
  );
}

export default BlogList;
