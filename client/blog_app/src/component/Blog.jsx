import React, { useState, useEffect } from 'react';
import RoundImage from './RoundImage';
import { Row, Col } from 'react-bootstrap';
import './blog.css';
import { useParams } from 'react-router';
import { getBlogByIdService } from '../services/blogService';

function Blog() {
  const [BlogData, setBlogData] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchBlogList = async () => {
      const BlogData = await getBlogByIdService(id);
      setBlogData(BlogData.data.data.data[0]);
      setUser(BlogData.data.data.data[0].user[0]);
    };
    fetchBlogList();
  }, [id]);
  console.log(user,"##################")
  return (
    <div style={{ margin: '1rem' }}>
      <Row className="user-profile">
        <Col>
          <RoundImage img={user.profile_image} className="profile-photo" />
        </Col>{' '}
        <Col>
          <h2 className="username"> {user.firstname} </h2> <p className="user-bio"> My bio </p>{' '}
        </Col>{' '}
      </Row>{' '}
      <Row className="blog-description">
        <h1> {BlogData.title} </h1>{' '}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <img style={{ width: '300px', height: '400px' }} src={BlogData.image} alt="example.com" />
        </div>{' '}
        <p> {BlogData.description} </p>{' '}
      </Row>{' '}
    </div>
  );
}

export default Blog;
