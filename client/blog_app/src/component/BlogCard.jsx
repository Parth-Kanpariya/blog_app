import React from 'react';
import RoundImage from './RoundImage';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './blogCard.css';
import { useNavigate } from 'react-router-dom';

function BlogCard(props) {
  const { description, title, image, user, blog_id } = props.blog;
  console.log(user[0].profile_image, "---------==============")
  const navigate = useNavigate();
  const handleBlogClick = () => {
    navigate(`/blog/${blog_id}`);
  };
  return (
    <div style={{ cursor: 'pointer ', margin: '1rem' }} onClick={handleBlogClick}>
      <hr />
      <Row className="user-profile">
        <Col>
          <RoundImage img={user[0].profile_image} className="profile-photo" />
        </Col>{' '}
        <Col>
          <h2 className="username"> {user[0].firstname} </h2> <p className="user-bio"> My bio </p>{' '}
        </Col>{' '}
      </Row>{' '}
      <Row className="blog-description">
        <h1> {title} </h1> <p> {description.substr(0, 200)} </p>{' '}
      </Row>{' '}
    </div>
  );
}

export default BlogCard;
