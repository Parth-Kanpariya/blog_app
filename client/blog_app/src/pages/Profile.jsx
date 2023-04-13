import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './profile.css';

function Profile() {
  const [selectedLink, setSelectedLink] = useState(false);
  useEffect(() => {
    document.getElementById('edit_profile').style.textDecoration = 'underline';
  }, []);

  const handleClick = (e) => {
    const link = e.target;
    if (link.name !== 'editProfile') {
      document.getElementById('edit_profile').style.textDecoration = 'none';
    }
    if (link === selectedLink) {
      // link is already selected, remove text decoration
      link.style.textDecoration = 'none';
      setSelectedLink(null);
    } else {
      // link is not selected, add text decoration
      if (selectedLink) {
        // remove text decoration from previously selected link
        selectedLink.style.textDecoration = 'none';
      }
      link.style.textDecoration = 'underline';
      setSelectedLink(link);
    }
  };
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginLeft: '2rem',
          marginTop: '1.5rem'
        }}>
        <Link className="links" name="editProfile" onClick={handleClick} id="edit_profile" to="">
          {' '}
          Edit Profile{' '}
        </Link>{' '}
        <Link className="links" to="myBlogs" onClick={handleClick} style={{ marginLeft: '2rem' }}>
          {' '}
          My_Blogs{' '}
        </Link>{' '}
        <Link className="links" to="following" onClick={handleClick} style={{ marginLeft: '2rem' }}>
          Followings
        </Link>
        <Link className="links" to="create" onClick={handleClick} style={{ marginLeft: '2rem' }}>
          {' '}
          Create Blog{' '}
        </Link>{' '}
        <Link to="blogs/:id" />
      </nav>{' '}
      <hr style={{ width: '29rem', margin: 0, marginLeft: '2rem', marginTop: '1rem' }} />
      <Outlet />
    </div>
  );
}

export default Profile;
