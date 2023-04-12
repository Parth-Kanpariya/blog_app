import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RoundImage from '../RoundImage';

function Comment({ comment, user }) {
  return (
    <div style={{ textAlign: 'justify' }}>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col>
          <RoundImage img={user.profile_image} style={{ width: '30px', height: '30px' }} />
        </Col>
        <Col style={{ marginLeft: '8px' }}>
          <p style={{ fontWeight: 'bold' }}>{user.firstname}</p>
        </Col>
      </Row>

      <p style={{ fontSize: '0.9rem' }}>{comment.text}</p>
    </div>
  );
}

export default Comment;
