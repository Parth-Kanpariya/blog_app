/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { getBlogService, getFilteredBlogService } from '../services/blogService';

function BlogList({ id, query }) {
  const [Blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const user_id = localStorage.userId;
  useEffect(() => {
    const fetchBlogList = async () => {
      const BlogList = await getBlogService(id);
      setBlogs(BlogList.data.data);
      const filteredBlogs = await getFilteredBlogService(query);
      setFilteredBlogs(filteredBlogs.data.data);
    };
    fetchBlogList();
  }, [query]);

  if (Blogs?.length === 0) {
    return;
  }

  return (
    <div>
      {id === undefined
        ? filteredBlogs?.length > 0
          ? filteredBlogs?.map((blog) => {
              return <BlogCard key={blog.blog_id} blog={blog} />;
            })
          : Blogs?.map((blog) => {
              return <BlogCard key={blog.blog_id} blog={blog} />;
            })
        : Blogs?.map((blog) => {
            if (blog.user_id === user_id) {
              return <BlogCard key={blog.blog_id} blog={blog} />;
            }
          })}{' '}
    </div>
  );
}

export default BlogList;
