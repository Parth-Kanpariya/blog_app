import React from 'react';
import './following.css';
import { Row, Col } from 'react-bootstrap';
import RoundImage from './RoundImage';

function Following() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      {list.map((no) => {
        return (
          <Row className="user-profile">
            <Col>
              <RoundImage className="profile-photo" />
            </Col>{' '}
            <Col>
              <h2 className="username"> Parth Kanpariya </h2> <p className="user-bio"> My bio </p>
            </Col>{' '}
          </Row>
        );
      })}{' '}
    </div>
  );
}

export default Following;
