import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RoundImage from '../RoundImage';
import './comment.css';

function Comment({ comment, user }) {
  return (
    <div className="comment-container">
      <Row className="comment-container-row">
        <Col>
          <RoundImage img={user.profile_image} style={{ width: '30px', height: '30px' }} />
        </Col>
        <Col className="username-container">
          <p className="userName">{user.firstname}</p>
        </Col>
      </Row>

      <p className="commnetText">{comment.text}</p>
    </div>
  );
}

export default Comment;
