import React, { useEffect, useState } from 'react';
import BlogCard from '../component/BlogCard';
import { getBlogService } from '../services/blogService';
import { useParams } from 'react-router-dom';
function BlogsOfFollowing({ query }) {
  const [Blogs, setBlogs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlogList = async () => {
      const BlogList = await getBlogService(id);
      setBlogs(BlogList.data.data);
    };
    fetchBlogList();
  }, [id]);

  const filteredBlog = Blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(query?.toLowerCase() || '') ||
      blog?.tags.find((tag) => tag?.toLowerCase().includes(query?.toLowerCase() || '')) ||
      blog.category.toLowerCase().includes(query?.toLowerCase() || '')
    );
  });
  return (
    <div>
      {id === undefined
        ? filteredBlog?.map((blog) => <BlogCard key={blog.blog_id} blog={blog} />)
        : filteredBlog?.map((blog) =>
            blog.user_id === id ? <BlogCard key={blog.blog_id} blog={blog} /> : ''
          )}
    </div>
  );
}

export default BlogsOfFollowing;
