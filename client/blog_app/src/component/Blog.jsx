import React from 'react';
import RoundImage from './RoundImage';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './blog.css';
const BlogData = {
  id: 1,
  title: 'My Blog1',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper nunc eget mauris fermentum, quis lacinia enim commodo. Donec ut vestibulum massa. Vestibulum ut ipsum eget mi malesuada consequat. Suspendisse euismod lectus et convallis tristique. In hac habitasse platea dictumst. Etiam nec sapien tellus. Proin vitae aliquam urna. Sed at pulvinar arcu. Sed bibendum eget justo sit amet viverra. Nulla suscipit faucibus quam, vel vestibulum nunc mattis at. Nam eget turpis mi. Sed maximus vitae nibh ac interdum. Nunc consequat odio sapien, in lacinia enim tempor at. Vivamus hendrerit bibendum arcu ac vehicula. Vivamus laoreet nisi vitae arcu porttitor, in auctor lacus aliquet.,',
  username: 'Jis me hain',
  photo: ''
};

function Blog() {
  const { title, description, username } = BlogData;
  return (
    <div style={{ margin: '1rem' }}>
      <Row className="user-profile">
        <Col>
          <RoundImage className="profile-photo" />
        </Col>{' '}
        <Col>
          <h2 className="username"> {username} </h2> <p className="user-bio"> My bio </p>{' '}
        </Col>{' '}
      </Row>{' '}
      <Row className="blog-description">
        <h1> {title} </h1>{' '}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <img
            src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
            alt="example.com"
          />
        </div>{' '}
        <p> {description} </p>{' '}
      </Row>{' '}
    </div>
  );
}

export default Blog;
