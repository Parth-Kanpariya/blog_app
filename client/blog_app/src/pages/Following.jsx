import React, { useEffect, useState } from 'react';
import './following.css';
import { Row, Col } from 'react-bootstrap';
import RoundImage from '../component/RoundImage';
import { getMyFollowingService } from '../services/followingService';
import { useNavigate } from 'react-router-dom';

function Following() {
  const [followingList, setFollowingList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFollowingList = async () => {
      const followingData = await getMyFollowingService();
      setFollowingList(followingData?.data?.data?.data);
    };
    fetchFollowingList();
  }, []);
  const handleFollowingClick = (id) => {
    navigate(`/blogs/${id}`, { replace: true });
  };
  return (
    <div style={{ marginTop: '2rem', marginLeft: '1.5em' }}>
      {followingList === undefined ? (
        <p>No Following</p>
      ) : (
        followingList?.map((following) => {
          return (
            <Row
              className="user-profile"
              key={following?.following_user?.user_id}
              onClick={() => handleFollowingClick(following?.following_user?.user_id)}>
              <Col>
                <RoundImage
                  className="profile-photo"
                  img={following?.following_user?.profile_image}
                />
              </Col>{' '}
              <Col>
                <h2 className="username"> {following?.following_user?.firstname} </h2>{' '}
                {/* <p className="user-bio"> My bio </p> */}
              </Col>{' '}
            </Row>
          );
        })
      )}{' '}
    </div>
  );
}

export default Following;
