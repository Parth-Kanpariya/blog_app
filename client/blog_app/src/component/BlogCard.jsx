import React from 'react';
import RoundImage from './RoundImage';
import { Row, Col } from 'react-bootstrap';
import './blogCard.css';
import { useNavigate } from 'react-router-dom';

function BlogCard(props) {
  const { description, title, user, image, blog_id } = props.blog;
  const navigate = useNavigate();
  const handleBlogClick = () => {
    navigate(`/blog/${blog_id}`);
  };
  function capitalizeWords(str) {
    return str
      ?.split(' ')
      ?.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      ?.join(' ');
  }
  return (
    <div
      style={{ cursor: 'pointer ', marginTop: '0.8rem', marginLeft: '0.8rem' }}
      onClick={handleBlogClick}>
      <Row className="user-profile">
        <Col>
          <RoundImage
            img={user[0].profile_image}
            className="profile_photo"
            style={{ width: '35px', height: '35px', marginTop: '7px' }}
          />
        </Col>{' '}
        <Col>
          <p
            className="username"
            style={{
              fontSize: '1.1rem',
              fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            }}>
            {' '}
            {user[0].firstname}{' '}
          </p>
        </Col>{' '}
      </Row>{' '}
      <Row className="blog-description">
        <h1
          style={{
            fontSize: '2.5rem',
            fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif"
          }}>
          {' '}
          {capitalizeWords(title)}{' '}
        </h1>
        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: 0
          }}>
          <Col>
            <p
              style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                maxWidth: '800px',
                fontSize: '1.5rem',
                fontFamily: "source-serif-pro, Georgia, Cambria, 'Times New Roman', Times, serif"
              }}>
              {' '}
              {description.substr(0, 200)}...{' '}
            </p>{' '}
          </Col>
          <Col>
            <img
              style={{ width: '140px', height: '150px', marginLeft: '8rem' }}
              src={image}
              alt="example.com"
            />
          </Col>
        </Row>
      </Row>{' '}
      <div style={{ display: 'flex', marginLeft: '2rem', marginTop: 0 }}>
        <p
          style={{
            backgroundColor: 'rgba(242, 242, 242, 1)',
            color: 'black',
            padding: '0.8rem',
            borderRadius: '15%'
          }}>
          {props?.blog?.tags[0]}
        </p>
      </div>
      <hr />
    </div>
  );
}

export default BlogCard;
