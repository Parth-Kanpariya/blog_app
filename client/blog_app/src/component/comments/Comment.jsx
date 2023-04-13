import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RoundImage from '../RoundImage';
import './comment.css';

function Comment({ comment, user }) {
  return (
    <div style={{ textAlign: 'justify' }}>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col>
          <RoundImage img={user.profile_image} style={{ width: '30px', height: '30px' }} />
        </Col>
        <Col style={{ marginLeft: '8px' }}>
          <p
            style={{
              fontFamily: "sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            }}>
            {user.firstname}
          </p>
        </Col>
      </Row>

      <p className="commnetText">{comment.text}</p>
    </div>
  );
}

export default Comment;
