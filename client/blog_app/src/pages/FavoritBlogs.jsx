/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import BlogCard from '../component/BlogCard';
import { getFavoritesService } from '../services/favoriteService';

function FavoriteBlogs() {
  const [Blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogList = async () => {
      const BlogList = await getFavoritesService();
      setBlogs(BlogList.data.data);
    };
    fetchBlogList();
  }, []);

  return (
    <div>
      {Blogs?.length >= 0 ? (
        Blogs?.map((blog) => {
          blog.blogs.user = blog?.user;
          return <BlogCard key={blog?.blogs?.blog_id} blog={blog?.blogs} />;
        })
      ) : (
        <p>No Blogs Saved!!</p>
      )}
    </div>
  );
}

export default FavoriteBlogs;
