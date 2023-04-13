import React, { useState, useEffect } from 'react';
import RoundImage from '../component/RoundImage';
import { Row, Col, ToastContainer } from 'react-bootstrap';
import './blog.css';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteBlogService, getBlogByIdService } from '../services/blogService';
import Button from '../component/Button';
import { successToast, errorToast } from '../helper/ToastComponent';
import CommentList from '../component/comments/CommentList';
import CommentInput from '../component/comments/CommentInput';
import { createLikeService, getLikeService } from '../services/likesService';
import {
  createFollowingService,
  getFollowingService,
  unFollowingService
} from '../services/followingService';
import Icon from '../component/Icon';

function Blog() {
  const [BlogData, setBlogData] = useState({});
  const [commentBox, setCommentBox] = useState(false);
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.userId;
  useEffect(() => {
    const fetchBlogList = async () => {
      const BlogApiData = await getBlogByIdService(id);
      const likesData = await getLikeService(id);
      setBlogData(BlogApiData?.data?.data?.data[0]);
      setUser(BlogApiData?.data?.data?.data[0]?.user[0]);
      setLiked(likesData?.data?.data?.data[0]?.userLiked);
      setNoOfLikes(likesData?.data?.data?.data[0]?.numberOfLikes);
      const followingData = await getFollowingService(
        BlogApiData?.data?.data?.data[0]?.user[0].user_id
      );
      setIsFollowing(followingData?.data?.data?.data[0].is_following);
    };
    fetchBlogList();
  }, [id]);

  const handleFollowClick = async (e) => {
    try {
      const resp = await createFollowingService(user?.user_id);
      if (resp.status === 201) {
        successToast('follwing  successfully!');
        setIsFollowing(!isFollowing);
      } else {
        errorToast(' not follwing!');
      }
    } catch (error) {
      errorToast(' not follwing!');
    }
  };
  const handleUnFollowClick = async (e) => {
    try {
      const resp = await unFollowingService(user?.user_id);
      if (resp.status === 200) {
        successToast('unfollow  successfully!');
        setIsFollowing(!isFollowing);
      } else {
        errorToast(' no action occured!');
      }
    } catch (error) {
      errorToast('error while unfollow!');
    }
  };
  const handleUpdateBlogClick = (e) => {
    navigate(`/profile/editblog?q=${BlogData.blog_id}`);
  };

  const handleCommentButtonClick = (e) => {
    setCommentBox(!commentBox);
  };

  const handleCancleCommentBox = (e) => {
    setCommentBox(!commentBox);
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
  const handleClapClick = async (e) => {
    if (liked === true) {
      return;
    }
    try {
      const body = {
        blog_id: BlogData.blog_id
      };
      const resp = await createLikeService(body);
      if (resp.status === 201) {
        successToast('like created successfully!');
        setNoOfLikes(noOfLikes + 1);
        setLiked(true);
      } else {
        errorToast('like not created!');
      }
    } catch (error) {
      errorToast('like not created!');
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
    <div className="blogContainer">
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
              <Button className="followButton" onClick={handleFollowClick} text="+ follow" />
            ) : (
              <Button
                className="followingButton"
                onClick={handleUnFollowClick}
                text="✓ following"
              />
            )}
          </Col>
        )}
      </Row>{' '}
      <Row className="blog-description">
        <h1 className="title"> {capitalizeWords(BlogData.title)} </h1>{' '}
        <div className="imageContainer">
          <img className="blog-image" src={BlogData.image} alt="example.com" />
        </div>{' '}
        <p className="blog-description"> {BlogData.description} </p>{' '}
      </Row>{' '}
      <div style={{ display: 'flex', marginLeft: '2rem' }}>
        {BlogData.tags?.map((tag, i) => (
          <p key={i} className="tags">
            {tag}
          </p>
        ))}
      </div>
      <Row className="row-of-icons">
        <Icon
          style={{
            marginLeft: '5px',
            cursor: 'pointer',
            height: '30px',
            width: '30px',
            color: liked === true ? 'black' : 'rgba(117, 117, 117, 1)'
          }}
          name="Check"
          icon={'faHandsClapping'}
          onClick={handleClapClick}
          size={'1x'}
          fixedWidth
        />

        <p className="numberOfLikes"> {noOfLikes || 0}</p>

        <Icon
          style={{
            marginLeft: '5px',
            cursor: 'pointer',
            height: '30px',
            width: '30px',
            color: 'rgba(117, 117, 117, 1)'
          }}
          name="Check"
          icon={'faComment'}
          onClick={handleCommentButtonClick}
          size={'1x'}
          fixedWidth
        />
      </Row>
      <CommentList blogId={BlogData.blog_id} />
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
      {commentBox === true ? (
        <CommentInput cancleCommentBox={handleCancleCommentBox} blogId={BlogData.blog_id} />
      ) : (
        ''
      )}
      <ToastContainer />
    </div>
  );
}

export default Blog;
