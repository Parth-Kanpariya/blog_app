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
    <div className="card-container" onClick={handleBlogClick}>
      <Row className="user-profile">
        <Col>
          <RoundImage
            img={user[0].profile_image}
            className="profile_photo"
            style={{ width: '35px', height: '35px', marginTop: '7px' }}
          />
        </Col>{' '}
        <Col>
          <p className="username"> {user[0].firstname} </p>
        </Col>{' '}
      </Row>{' '}
      <Row className="blog-description">
        <h1 className="blog-title"> {capitalizeWords(title)} </h1>
        <Row className="description-container">
          <Col>
            <p className="blog-description-paragraph"> {description.substr(0, 200)}... </p>{' '}
          </Col>
          <Col>
            <img className="blog-image" src={image} alt="example.com" />
          </Col>
        </Row>
      </Row>{' '}
      <div className="tags-container">
        <p className="tags">{props?.blog?.tags[0]}</p>
      </div>
      <hr />
    </div>
  );
}

export default BlogCard;
