import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginLeft: '2rem'
        }}>
        <Link to=""> My_Blogs </Link>{' '}
        <Link to="following" style={{ marginLeft: '2rem' }}>
          {' '}
          Followings{' '}
        </Link>{' '}
      </nav>{' '}
      <Outlet />
    </div>
  );
}

export default Profile;
