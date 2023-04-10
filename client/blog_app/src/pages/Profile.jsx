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
        <Link to="edit"> Edit Profile </Link>{' '}
        <Link to="" style={{ marginLeft: '2rem' }}>
          {' '}
          My_Blogs{' '}
        </Link>{' '}
        <Link to="following" style={{ marginLeft: '2rem' }}>
          Followings
        </Link>
        <Link to="create" style={{ marginLeft: '2rem' }}>
          {' '}
          Create{' '}
        </Link>{' '}
      </nav>{' '}
      <hr />
      <Outlet />
    </div>
  );
}

export default Profile;
