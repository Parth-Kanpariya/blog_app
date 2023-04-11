import React, { useState, useEffect } from 'react';
import RoundImage from './RoundImage';
import { Row, Col } from 'react-bootstrap';
import './blog.css';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { deleteBlogService, getBlogByIdService } from '../services/blogService';
import Button from './Button';
import { successToast, errorToast } from '../helper/ToastComponent';
import EditBlog from '../pages/EditBlog';

function Blog() {
  const [BlogData, setBlogData] = useState({});
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.userId;
  useEffect(() => {
    const fetchBlogList = async () => {
      const BlogData = await getBlogByIdService(id);
      setBlogData(BlogData.data.data.data[0]);
      setUser(BlogData.data.data.data[0].user[0]);
    };
    fetchBlogList();
  }, [id]);
  console.log(user, '##################');
  const handleFollowClick = (e) => {
    setIsFollowing(!isFollowing);
  };
  const handleUnFollowClick = (e) => {
    setIsFollowing(!isFollowing);
  };
  const handleUpdateBlogClick = (e) => {
    navigate(`/profile/editblog?q=${BlogData.blog_id}`);
  };
  const handleDeleteBlogClick = async (e) => {
    try {
      const resp = await deleteBlogService(id);
      if (resp.status === 200) {
        successToast('Blog deleted successfully!');
        navigate('/');
      } else {
        errorToast('Blog not deleted!');
      }
    } catch (error) {
      errorToast('Blog not deleted!');
    }
  };

  function capitalizeWords(str) {
    return str
      ?.split(' ')
      ?.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      ?.join(' ');
  }

  const dateString = (dateString) => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1; // Add 1 to get the actual month (January is 0)
    const day = date.getDate();
    const newDate = new Date(2023, month - 1, day); // Create a new date object with the given month and day

    const options = { month: 'short', day: 'numeric' };

    const formattedDate = newDate.toLocaleString('en-US', options); // Format the date using the 'en-US' locale

    return formattedDate;
  };
  return (
    <div style={{ margin: '1rem' }}>
      <Row className="user-profile">
        <Col>
          <RoundImage img={user.profile_image} className="profile-photo" />
        </Col>{' '}
        <Col>
          <p className="username"> {user.firstname} </p>{' '}
          <p className="user-bio"> {dateString(BlogData.created_at)} </p>{' '}
        </Col>
        {user.user_id !== userId && (
          <Col>
            {isFollowing === false ? (
              <Button
                style={{
                  marginLeft: '1rem',
                  borderRadius: '15%',
                  backgroundColor: 'black',
                  color: 'white'
                }}
                onClick={handleFollowClick}
                text="+ follow"
              />
            ) : (
              <Button
                style={{
                  marginLeft: '1rem',
                  borderRadius: '15%',
                  backgroundColor: '#454545',
                  color: 'white'
                }}
                onClick={handleUnFollowClick}
                text="✓ following"
              />
            )}
          </Col>
        )}
      </Row>{' '}
      <Row className="blog-description">
        <h1 style={{ fontSize: '2.5rem' }}> {capitalizeWords(BlogData.title)} </h1>{' '}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <img style={{ width: '300px', height: '400px' }} src={BlogData.image} alt="example.com" />
        </div>{' '}
        <p style={{ fontSize: '1.5rem' }}> {BlogData.description} </p>{' '}
      </Row>{' '}
      {user.user_id === userId ? (
        <Row className="changeBlogConfig">
          <Col>
            <Button
              style={{
                marginLeft: '1rem',
                borderRadius: '5%',
                backgroundColor: '#454545',
                color: 'white',
                width: '5rem'
              }}
              onClick={handleUpdateBlogClick}
              text="update"
            />
          </Col>
          <Col>
            <Button
              style={{
                marginLeft: '1rem',
                borderRadius: '5%',
                backgroundColor: 'red',
                color: 'white',
                width: '5rem'
              }}
              onClick={handleDeleteBlogClick}
              text="Delete"
            />
          </Col>
        </Row>
      ) : (
        ''
      )}
    </div>
  );
}

export default Blog;
